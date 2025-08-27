import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { ProductDetails } from '@/components/product/ProductDetails';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { RecentlyViewed } from '@/components/product/RecentlyViewed';
import { getProductBySlug, getRelatedProducts } from '@/data/products';

interface ProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Namamy',
    };
  }

  return {
    title: product.seoTitle || `${product.name} | Namamy`,
    description: product.seoDescription || product.description,
    keywords: product.tags.join(', '),
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0]?.url || '/images/placeholder-product.jpg',
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: locale,
      type: 'product',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]?.url || '/images/placeholder-product.jpg'],
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

export default function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  const breadcrumbItems = [
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
    { label: product.name },
  ];

  // Product structured data
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'Namamy',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Namamy',
    },
    image: product.images.map(img => img.url),
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'INR',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Namamy',
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: product.price,
        priceCurrency: 'INR',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.totalReviews.toString(),
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${product.nutritionInfo.calories} calories`,
      proteinContent: `${product.nutritionInfo.protein}g`,
      fatContent: `${product.nutritionInfo.totalFat}g`,
      carbohydrateContent: `${product.nutritionInfo.totalCarbohydrates}g`,
      fiberContent: `${product.nutritionInfo.dietaryFiber}g`,
      sugarContent: `${product.nutritionInfo.totalSugars}g`,
      sodiumContent: `${product.nutritionInfo.sodium}mg`,
    },
    weight: product.weight,
    category: product.category,
    productID: product.id,
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