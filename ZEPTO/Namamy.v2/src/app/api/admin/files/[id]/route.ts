import { NextRequest, NextResponse } from 'next/server';

// This would be imported from the main route file or database
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
  }
];

// GET - Get specific file details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const file = uploadedFiles.find(f => f.id === id);
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      file
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch file' },
      { status: 500 }
    );
  }
}

// PUT - Update file metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, tags, folder } = body;
    
    const fileIndex = uploadedFiles.findIndex(f => f.id === id);
    
    if (fileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    let file = uploadedFiles[fileIndex];
    const updates: any = {};

    if (name && name !== file.name) {
      updates.name = name.toLowerCase().replace(/\s+/g, '-');
      updates.url = file.url.replace(/\/[^\/]+$/, `/${updates.name}`);
      if (file.thumbnailUrl) {
        updates.thumbnailUrl = file.thumbnailUrl.replace(/\/[^\/]+$/, `/${updates.name}`);
      }
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (tags !== undefined) {
      updates.tags = Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
    }

    if (folder && folder !== file.folder) {
      updates.folder = folder;
      updates.url = file.url.replace(/\/uploads\/[^\/]+\//, `/uploads/${folder}/`);
      if (file.thumbnailUrl) {
        updates.thumbnailUrl = file.thumbnailUrl.replace(/\/uploads\/[^\/]+\//, `/uploads/${folder}/`);
      }
    }

    // Apply updates
    file = { ...file, ...updates };
    uploadedFiles[fileIndex] = file;

    console.log(`File updated: ${file.name}`);

    return NextResponse.json({
      success: true,
      file,
      message: 'File updated successfully'
    });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update file' },
      { status: 500 }
    );
  }
}

// DELETE - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const fileIndex = uploadedFiles.findIndex(f => f.id === id);
    
    if (fileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    const deletedFile = uploadedFiles[fileIndex];
    uploadedFiles.splice(fileIndex, 1);

    console.log(`File deleted: ${deletedFile.name}`);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}

// PATCH - Perform specific file operations
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action, data } = body;
    
    const fileIndex = uploadedFiles.findIndex(f => f.id === id);
    
    if (fileIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    let file = uploadedFiles[fileIndex];
    let message = '';

    switch (action) {
      case 'duplicate':
        const duplicatedFile = {
          ...file,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: `copy-of-${file.name}`,
          originalName: `Copy of ${file.originalName}`,
          uploadedAt: new Date().toISOString(),
          url: file.url.replace(/\/([^\/]+)$/, '/copy-of-$1'),
          thumbnailUrl: file.thumbnailUrl?.replace(/\/([^\/]+)$/, '/copy-of-$1') || file.thumbnailUrl || '',
          dimensions: file.dimensions || { width: 0, height: 0 }
        };
        
        uploadedFiles.push(duplicatedFile);
        message = 'File duplicated successfully';
        
        return NextResponse.json({
          success: true,
          file: duplicatedFile,
          message
        });

      case 'move':
        const { newFolder } = data;
        if (!newFolder) {
          return NextResponse.json(
            { success: false, error: 'New folder is required' },
            { status: 400 }
          );
        }

        file.folder = newFolder;
        file.url = file.url.replace(/\/uploads\/[^\/]+\//, `/uploads/${newFolder}/`);
        if (file.thumbnailUrl) {
          file.thumbnailUrl = file.thumbnailUrl.replace(/\/uploads\/[^\/]+\//, `/uploads/${newFolder}/`);
        }
        
        uploadedFiles[fileIndex] = file;
        message = `File moved to ${newFolder} folder`;
        break;

      case 'regenerate_thumbnail':
        if (file.category === 'image') {
          // Simulate thumbnail regeneration
          file.thumbnailUrl = file.url.replace(/\/([^\/]+)$/, '/thumbs/$1');
          uploadedFiles[fileIndex] = file;
          message = 'Thumbnail regenerated successfully';
        } else {
          return NextResponse.json(
            { success: false, error: 'Thumbnails can only be generated for images' },
            { status: 400 }
          );
        }
        break;

      case 'optimize':
        if (file.category === 'image') {
          // Simulate image optimization
          const originalSize = file.size;
          file.size = Math.floor(file.size * 0.7); // Simulate 30% size reduction
          uploadedFiles[fileIndex] = file;
          message = `Image optimized: ${Math.round(((originalSize - file.size) / originalSize) * 100)}% size reduction`;
        } else {
          return NextResponse.json(
            { success: false, error: 'Only images can be optimized' },
            { status: 400 }
          );
        }
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    console.log(`File ${action}: ${file.name}`);

    return NextResponse.json({
      success: true,
      file,
      message
    });
  } catch (error) {
    console.error('Error performing file operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform file operation' },
      { status: 500 }
    );
  }
}