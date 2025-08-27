import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { ProductDetails } from '@/components/product/ProductDetails';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { Product, ProductImage } from '@/types';

// API helper functions
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Use direct API import instead of fetch for SSR
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (product) {
      // Transform the data to match our Product type
      const transformedProduct = {
        ...product,
        tags: typeof product.tags === 'string' ? JSON.parse(product.tags) : product.tags,
        images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
        nutrition: typeof product.nutrition === 'string' ? JSON.parse(product.nutrition) : product.nutrition,
        ingredients: typeof product.ingredients === 'string' ? JSON.parse(product.ingredients) : product.ingredients,
        rating: 4.5, // Default rating for now
        reviewCount: product.reviews?.length || 0,
        stockCount: product.stockCount || 0,
        featured: product.featured || false,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
      };
      
      await prisma.$disconnect();
      return transformedProduct as unknown as Product;
    }
    
    await prisma.$disconnect();
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  try {
    // Use direct API import instead of fetch for SSR
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const products = await prisma.product.findMany({
      where: {
        category,
        id: { not: productId },
        inStock: true
      },
      take: 4,
      orderBy: {
        featured: 'desc'
      }
    });

    // Transform the data
    const transformedProducts = products.map(product => ({
      ...product,
      tags: typeof product.tags === 'string' ? JSON.parse(product.tags) : product.tags,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
      nutrition: typeof product.nutrition === 'string' ? JSON.parse(product.nutrition) : product.nutrition,
      ingredients: typeof product.ingredients === 'string' ? JSON.parse(product.ingredients) : product.ingredients,
      rating: 4.5, // Default rating
      reviewCount: 0,
      totalReviews: 0,
      stockCount: product.stockCount || 0,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    await prisma.$disconnect();
    return transformedProducts as Product[];
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

interface ProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Namamy',
    };
  }

  return {
    title: (product as any).seoTitle || `${product.name} | Namamy`,
    description: (product as any).seoDescription || product.description,
    keywords: (product as any).tags && Array.isArray((product as any).tags) ? (product as any).tags.join(', ') : (product.category || 'makhana'),
    openGraph: {
      title: product.name,
      description: (product as any).shortDescription || product.description,
      images: [
        {
          url: String((Array.isArray(product.images) ? product.images[0] : product.images) || '/images/placeholder-product.svg'),
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: (product as any).shortDescription || product.description,
      images: [product.images?.[0] || '/images/placeholder-product.svg'],
    },
    alternates: {
      canonical: `/${locale}/product/${slug}`,
      languages: {
        'en': `/en/product/${slug}`,
        'hi': `/hi/product/${slug}`,
        'ta': `/ta/product/${slug}`,
        'bn': `/bn/product/${slug}`,
      },
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
    { label: product.category || 'Products', href: `/shop?category=${product.category ? product.category.toLowerCase() : 'all'}` },
    { label: product.name },
  ];

  // Enhanced Product structured data
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://namamy.com/${locale}/product/${slug}#product`,
    name: product.name,
    description: product.description,
    sku: (product as any).sku || `NAMAMY-${product.id}`,
    mpn: `MPN-${product.id}`,
    brand: {
      '@type': 'Brand',
      '@id': 'https://namamy.com/#brand',
      name: 'Namamy',
      logo: 'https://namamy.com/images/namamy-logo-banner.jpg'
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': 'https://namamy.com/#organization',
      name: 'Namamy',
      url: 'https://namamy.com'
    },
    image: product.images && Array.isArray(product.images) && product.images.length > 0 ? 
      product.images.map((imageUrl: any) => {
        const url = typeof imageUrl === 'string' ? imageUrl : imageUrl.url || imageUrl;
        return url && url.startsWith('http') ? url : `https://namamy.com${url}`;
      }) : ['https://namamy.com/images/placeholder-product.svg'],
    offers: {
      '@type': 'Offer',
      '@id': `https://namamy.com/${locale}/product/${slug}#offer`,
      price: product.price.toString(),
      priceCurrency: 'INR',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': 'https://namamy.com/#organization',
        name: 'Namamy',
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: product.price,
        priceCurrency: 'INR',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 7,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ((product as any).rating || 4.5).toString(),
      reviewCount: ((product as any).totalReviews || 250).toString(),
      bestRating: '5',
      worstRating: '1'
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: '350 per 100g',
      proteinContent: '9.7g per 100g',
      carbohydrateContent: '76.9g per 100g',
      fatContent: '0.1g per 100g',
      fiberContent: '14.5g per 100g'
    },
    weight: {
      '@type': 'QuantitativeValue',
      value: product.weight,
      unitText: 'g'
    },
    category: {
      '@type': 'CategoryCode',
      name: product.category,
      codeValue: product.category
    },
    productID: product.id,
    keywords: [
      'makhana',
      'fox nuts',
      'healthy snacks',
      'protein snacks',
      'lotus seeds',
      product.category,
      'namamy'
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Organic',
        value: 'Yes'
      },
      {
        '@type': 'PropertyValue',
        name: 'Gluten Free',
        value: 'Yes'
      },
      {
        '@type': 'PropertyValue',
        name: 'Vegan',
        value: 'Yes'
      }
    ]
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://namamy.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `https://namamy.com/${locale}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: `https://namamy.com/${locale}/shop?category=${product.category.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://namamy.com/${locale}/product/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <Layout 
        locale={locale} 
        showBreadcrumb={true} 
        breadcrumbItems={breadcrumbItems}
      >
        <ProductDetails product={product} locale={locale} />
        
        {relatedProducts.length > 0 && (
          <RelatedProducts 
            products={relatedProducts} 
            locale={locale} 
          />
        )}
        
        <RecentlyViewed locale={locale} />
      </Layout>
    </>
  );
}