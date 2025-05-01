import { Product } from '../../types/products';
import { useDropzone } from 'react-dropzone';
import {useCallback, useState} from 'react'
import { useProducts } from '../../hooks/useProducts';
import { getPresignedUploadURL, uploadImageToS3 } from '../../api/s3API';


export default function ProductForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({
    provider_id: 1,
    category_id: 1,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    size: "",
    discount: 0,
    gender: "",
    age: "",
    tags: [],
    image_paths: []
  });
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImageKeys, setUploadedImageKeys] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const { 
    addProduct
  } = useProducts();

  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages(prevImages => [...prevImages, ...acceptedFiles].slice(0, 5));

    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 5)); // Limit to 5 images

  }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 5
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'price'
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      uploadImages();
      if (uploadedImageKeys.length === 0) {
        alert("Ingrese como minimo 1 imagen")
        return
      }
      const product = {
        ...formData,
        image_paths: uploadedImageKeys, // Add the uploaded image keys to the form data
      };
      await addProduct(product);
      setFormData({     provider_id: 1,
        category_id: 1,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        size: "",
        discount: 0,
        gender: "",
        age: "",
        tags: [],
        image_paths: [] });
        setImages([])
        setPreviews([])
    } catch (err: any) {
      alert(err.message || 'Failed to create product');
    }
  };

  const uploadImages = async () => {
    setUploadingImage(true)
    setUploadedImageKeys([]);

    const uploadPromises = images.map(async (image) => {
      try{
        const uploadData = await getPresignedUploadURL(image.name, image.type);
        const signedURL = uploadData.presignedUrl;
        const s3key = uploadData.key;

        await uploadImageToS3(signedURL, image)
        return s3key
      }  catch (error) {
        console.error(`Error uploadin image ${image.name}`, error);
      }
    })

    const resolvedKeys = await Promise.all(uploadPromises);
    const successfulKeys = resolvedKeys.filter((key): key is string => key !== null); // Type predicate to filter out null
    setUploadedImageKeys(successfulKeys);
    setUploadingImage(false)
  }

  const removeImage = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index)); 
  };

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow text-text-base border bg-gradient-to-r from-pink-200 to-purple-200">
      <h2 className="text-xl font-semibold mb-4 text-ce">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              step="0.01"
              min="1"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Talla</label>
            <input
              type="text"
              name="size"
              value={formData.size || ''}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descuento (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount || 0}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Genero</label>
            <input
              type="string"
              name="gender"
              value={formData.gender || ""}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Edad</label>
            <input
              type="string"
              name="age"
              value={formData.age || ""}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags (separar por coma)</label>
            <input
              type="string"
              name="tags"
              value={formData.tags || ""}
              onChange={handleInputChange}
              className="bg-pink-50 shadow-md border rounded-lg w-full py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300"
              
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Imágenes del Producto (Máx. 5)</label>
          <div 
            {...getRootProps()} 
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
          >
            <input required {...getInputProps()} />
            {isDragActive ? (
              <p className="text-text-base">Suelta las imágenes aquí...</p>
            ) : (
              <p className="text-text-base">
                Arrastra y suelta imágenes aquí, o haz clic para seleccionar
                <br />
                <span className="text-xs text-text-base">Formatos: JPEG, PNG, WEBP</span>
              </p>
            )}
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
            <button
            type="submit"
            className="bg-pink-50 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-lg hover:cursor-pointer"
            >
              Agregar
            </button>
        </div>
      </form>
    </div>
  );
}