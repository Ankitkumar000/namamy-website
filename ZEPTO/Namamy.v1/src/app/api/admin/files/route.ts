import { NextRequest, NextResponse } from 'next/server';

// Mock files data
let uploadedFiles = [
  {
    id: '1',
    name: 'premium-makhana-hero.jpg',
    originalName: 'Premium Makhana Hero Image.jpg',
    size: 2548576,
    type: 'image/jpeg',
    category: 'image',
    url: '/images/products/premium-makhana-hero.jpg',
    thumbnailUrl: '/images/products/thumbs/premium-makhana-hero.jpg',
    uploadedAt: '2024-01-30T10:30:00Z',
    uploadedBy: 'Admin User',
    folder: 'products',
    dimensions: { width: 1920, height: 1080 },
    tags: ['product', 'hero', 'makhana'],
    description: 'Hero image for premium makhana product page'
  },
  {
    id: '2',
    name: 'roasted-variety-pack.png',
    originalName: 'Roasted Variety Pack.png',
    size: 1823440,
    type: 'image/png',
    category: 'image',
    url: '/images/products/roasted-variety-pack.png',
    thumbnailUrl: '/images/products/thumbs/roasted-variety-pack.png',
    uploadedAt: '2024-01-29T15:20:00Z',
    uploadedBy: 'Admin User',
    folder: 'products',
    dimensions: { width: 800, height: 600 },
    tags: ['product', 'roasted', 'variety'],
    description: 'Roasted makhana variety pack image'
  },
  {
    id: '3',
    name: 'brand-logo-vector.svg',
    originalName: 'Namamy Brand Logo Vector.svg',
    size: 45120,
    type: 'image/svg+xml',
    category: 'image',
    url: '/images/brand/brand-logo-vector.svg',
    uploadedAt: '2024-01-28T09:15:00Z',
    uploadedBy: 'Design Team',
    folder: 'brand',
    tags: ['logo', 'brand', 'vector'],
    description: 'Official Namamy brand logo in vector format'
  },
  {
    id: '4',
    name: 'product-catalog-2024.pdf',
    originalName: 'Product Catalog 2024.pdf',
    size: 5242880,
    type: 'application/pdf',
    category: 'document',
    url: '/documents/product-catalog-2024.pdf',
    uploadedAt: '2024-01-25T14:30:00Z',
    uploadedBy: 'Marketing Team',
    folder: 'marketing',
    tags: ['catalog', 'products', '2024'],
    description: 'Complete product catalog for 2024'
  },
  {
    id: '5',
    name: 'makhana-process-video.mp4',
    originalName: 'Makhana Processing Video.mp4',
    size: 156742144,
    type: 'video/mp4',
    category: 'video',
    url: '/videos/makhana-process-video.mp4',
    thumbnailUrl: '/videos/thumbs/makhana-process-video.jpg',
    uploadedAt: '2024-01-20T11:45:00Z',
    uploadedBy: 'Content Team',
    folder: 'content',
    tags: ['video', 'process', 'makhana'],
    description: 'Video showing the makhana processing workflow'
  }
];

// GET - Get all files with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const folder = searchParams.get('folder');
    const sortBy = searchParams.get('sortBy') || 'uploadedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filteredFiles = [...uploadedFiles];

    // Apply search filter
    if (search) {
      filteredFiles = filteredFiles.filter(file =>
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        file.originalName.toLowerCase().includes(search.toLowerCase()) ||
        file.description?.toLowerCase().includes(search.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply category filter
    if (category && category !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.category === category);
    }

    // Apply folder filter
    if (folder && folder !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.folder === folder);
    }

    // Apply sorting
    filteredFiles.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'uploadedAt':
        default:
          aValue = new Date(a.uploadedAt).getTime();
          bValue = new Date(b.uploadedAt).getTime();
          break;
      }

      if (typeof aValue === 'string') {
        if (sortOrder === 'asc') {
          return aValue.localeCompare(bValue as string);
        } else {
          return (bValue as string).localeCompare(aValue);
        }
      } else {
        if (sortOrder === 'asc') {
          return (aValue as number) - (bValue as number);
        } else {
          return (bValue as number) - (aValue as number);
        }
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

    // Calculate stats
    const stats = {
      totalFiles: uploadedFiles.length,
      totalSize: uploadedFiles.reduce((sum, file) => sum + file.size, 0),
      images: uploadedFiles.filter(f => f.category === 'image').length,
      documents: uploadedFiles.filter(f => f.category === 'document').length,
      videos: uploadedFiles.filter(f => f.category === 'video').length,
      others: uploadedFiles.filter(f => !['image', 'document', 'video'].includes(f.category)).length
    };

    // Get unique folders
    const folders = Array.from(new Set(uploadedFiles.map(file => file.folder)));

    return NextResponse.json({
      success: true,
      files: paginatedFiles,
      stats,
      folders,
      pagination: {
        page,
        limit,
        total: filteredFiles.length,
        totalPages: Math.ceil(filteredFiles.length / limit),
        hasNext: endIndex < filteredFiles.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch files' },
      { status: 500 }
    );
  }
}

// POST - Upload new file or bulk operations
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');

    if (contentType?.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData();
      const files = formData.getAll('files') as File[];
      const folder = formData.get('folder') as string || 'uploads';
      const tags = formData.get('tags') as string || '';
      const description = formData.get('description') as string || '';

      if (!files.length) {
        return NextResponse.json(
          { success: false, error: 'No files provided' },
          { status: 400 }
        );
      }

      const uploadedFilesList = [];

      for (const file of files) {
        // Validate file
        if (file.size > 50 * 1024 * 1024) { // 50MB limit
          return NextResponse.json(
            { success: false, error: `File ${file.name} is too large (max 50MB)` },
            { status: 400 }
          );
        }

        const category = file.type.startsWith('image/') ? 'image' :
                        file.type.startsWith('video/') ? 'video' :
                        file.type.startsWith('audio/') ? 'audio' :
                        file.type === 'application/pdf' || file.type.includes('document') ? 'document' : 'other';

        const newFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name.toLowerCase().replace(/\s+/g, '-'),
          originalName: file.name,
          size: file.size,
          type: file.type,
          category,
          url: `/uploads/${folder}/${file.name}`,
          thumbnailUrl: category === 'image' ? `/uploads/${folder}/thumbs/${file.name}` : '',
          uploadedAt: new Date().toISOString(),
          uploadedBy: 'Admin User',
          folder,
          tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
          description: description || `${file.name} uploaded to ${folder}`,
          dimensions: category === 'image' ? { width: 1024, height: 768 } : { width: 0, height: 0 }
        };

        uploadedFiles.push(newFile);
        uploadedFilesList.push(newFile);

        // In a real implementation, you would save the file to storage here
        console.log(`File uploaded: ${file.name} to ${folder}`);
      }

      return NextResponse.json({
        success: true,
        files: uploadedFilesList,
        message: `${uploadedFilesList.length} file(s) uploaded successfully`
      });

    } else {
      // Handle bulk operations
      const body = await request.json();
      const { action, fileIds, data } = body;

      if (!action || !fileIds || !Array.isArray(fileIds)) {
        return NextResponse.json(
          { success: false, error: 'Action and file IDs are required' },
          { status: 400 }
        );
      }

      let updatedCount = 0;

      switch (action) {
        case 'delete':
          const beforeLength = uploadedFiles.length;
          uploadedFiles = uploadedFiles.filter(file => !fileIds.includes(file.id));
          updatedCount = beforeLength - uploadedFiles.length;
          break;

        case 'move':
          const { folder } = data;
          if (!folder) {
            return NextResponse.json(
              { success: false, error: 'Folder is required for move operation' },
              { status: 400 }
            );
          }

          uploadedFiles = uploadedFiles.map(file => {
            if (fileIds.includes(file.id)) {
              updatedCount++;
              return {
                ...file,
                folder,
                url: file.url.replace(/\/uploads\/[^\/]+\//, `/uploads/${folder}/`),
                thumbnailUrl: file.thumbnailUrl?.replace(/\/uploads\/[^\/]+\//, `/uploads/${folder}/`) || file.thumbnailUrl || ''
              };
            }
            return file;
          });
          break;

        case 'tag':
          const { tags } = data;
          if (!tags) {
            return NextResponse.json(
              { success: false, error: 'Tags are required for tag operation' },
              { status: 400 }
            );
          }

          const newTags = tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
          
          uploadedFiles = uploadedFiles.map(file => {
            if (fileIds.includes(file.id)) {
              updatedCount++;
              return {
                ...file,
                tags: Array.from(new Set([...file.tags, ...newTags]))
              };
            }
            return file;
          });
          break;

        default:
          return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
          );
      }

      console.log(`Bulk ${action} performed on ${updatedCount} files`);

      return NextResponse.json({
        success: true,
        message: `${updatedCount} files processed successfully`,
        updatedCount
      });
    }
  } catch (error) {
    console.error('Error processing files request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process files request' },
      { status: 500 }
    );
  }
}