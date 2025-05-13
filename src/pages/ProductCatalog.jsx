import { useState, useEffect } from 'react'
import { FaFilter, FaShoppingCart, FaPaintBrush, FaPaintRoller, FaTools, FaPalette, FaHome } from 'react-icons/fa'

// Product data
const allProducts = [
  // Interior Paints
  {
    id: 1,
    name: "Dulux Weathershield Max",
    category: "Interior Paint",
    color: "Pure White",
    size: "5L",
    price: 2499,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747093744/23e3a5dbd7f0d524f89284ce929a2de6_ajuzfs.avif",
    description: "Premium interior paint with superior coverage."
  },
  {
    id: 2,
    name: "Dulux Rich Matt",
    category: "Interior Paint",
    color: "Sage Green",
    size: "10L",
    price: 2199,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747093778/download_fd1orc.jpg",
    description: "Deep, rich matt finish for sophisticated interiors."
  },
  {
    id: 3,
    name: "Dulux Velvet Touch",
    category: "Interior Paint",
    color: "Lavender Bloom",
    size: "5L",
    price: 2599,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747093817/download_yc6cic.jpg",
    description: "Smooth velvet finish for living rooms."
  },
  {
    id: 4,
    name: "Dulux Interior Glow",
    category: "Interior Paint",
    color: "Ocean Blue",
    size: "10L",
    price: 2650,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747093866/download_l4j3ef.jpgpeg",
    description: "Radiant interior paint with moisture resistance."
  },
  {
    id: 6,
    name: "Dulux Pastel Mint",
    category: "Interior Paint",
    color: "Pastel Mint",
    size: "5L",
    price: 2399,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747093948/images_wiz5j8.jpg",
    description: "Light and refreshing shade for bedrooms."
  },
  {
    id: 7,
    name: "Dulux Rustic Terracotta",
    category: "Interior Paint",
    color: "Rustic Terracotta",
    size: "10L",
    price: 2699,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094068/download_xirq2q.jpg",
    description: "Earthy tone for elegant accents."
  },

  {
    id: 9,
    name: "Dulux Urban Grey",
    category: "Interior Paint",
    color: "Urban Grey",
    size: "10L",
    price: 2599,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094124/download_gfwxro.jpg",
    description: "Contemporary grey for modern homes."
  },
  {
    id: 10,
    name: "Dulux Lush Lime",
    category: "Interior Paint",
    color: "Lime Green",
    size: "5L",
    price: 2499,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094159/download_nuhfif.jpg",
    description: "Fresh, zesty lime color ideal for kitchens."
  },
  {
    id: 11,
    name: "Dulux Soft Peach",
    category: "Interior Paint",
    color: "Peach",
    size: "5L",
    price: 2499,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094228/download_islrnw.jpg",
    description: "Soft pastel peach for elegant walls."
  },
  {
    id: 12,
    name: "Dulux Warm Sunset",
    category: "Interior Paint",
    color: "Sunset Orange",
    size: "10L",
    price: 2699,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094267/images_ngawac.jpg",
    description: "Vibrant and inviting for creative spaces."
  },
  {
    id: 14,
    name: "Dulux Sky Blue",
    category: "Interior Paint",
    color: "Sky Blue",
    size: "5L",
    price: 2449,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094306/images_lq9amf.jpg",
    description: "Serene shade for calm bedrooms."
  },
  
  {
    id: 16,
    name: "Dulux Rose Blush",
    category: "Interior Paint",
    color: "Rose Pink",
    size: "5L",
    price: 2399,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094351/download_nodome.jpg",
    description: "Gentle pink perfect for children’s rooms."
  },
  {
    id: 17,
    name: "Dulux Forest Fern",
    category: "Interior Paint",
    color: "Fern Green",
    size: "10L",
    price: 2699,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094398/images_qmc3m8.jpg",
    description: "Natural leafy shade ideal for feature walls."
  },
  {
    id: 19,
    name: "Dulux Arctic White",
    category: "Interior Paint",
    color: "Arctic White",
    size: "10L",
    price: 2599,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747094512/images_o8eap1.jpg",
    description: "Bright white for high contrast walls."
  },


  // Exterior Paints
  {
    id: 22,
    name: "Dulux Exterior Acrylic",
    category: "Exterior Paint",
    color: "Sunset Orange",
    size: "10L",
    price: 3099,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747097873/download_nzl6ht.jpg",
    description: "Durable acrylic paint for vibrant exterior finishes."
  },
  {
    id: 23,
    name: "Dulux Storm Shield",
    category: "Exterior Paint",
    color: "Midnight Blue",
    size: "20L",
    price: 3299,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747097909/download_akczum.jpg",
    description: "Protection against extreme weather conditions."
  },
  {
    id: 24,
    name: "Dulux Roof Guard",
    category: "Exterior Paint",
    color: "Pebble Grey",
    size: "10L",
    price: 2899,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747097939/download_vmiza0.jpg",
    description: "Advanced UV protection paint for exterior walls."
  },
  {
    id: 25,
    name: "Dulux Exterior Silk",
    category: "Exterior Paint",
    color: "Olive Green",
    size: "15L",
    price: 2999,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747097990/download_dobuze.jpg",
    description: "Silk finish exterior paint with superior adhesion."
  },
  {
    id: 26,
    name: "Dulux Concrete Guard",
    category: "Exterior Paint",
    color: "Ash Grey",
    size: "20L",
    price: 3199,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098040/download_hjwfxf.jpg",
    description: "Protects concrete surfaces from weathering."
  },
  {
    id: 27,
    name: "Dulux Aqua Tech",
    category: "Exterior Paint",
    color: "Ocean Blue",
    size: "10L",
    price: 2999,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098113/download_t1g87w.jpg",
    description: "High durability paint for coastal conditions."
  },
  {
    id: 28,
    name: "Dulux Smart Exterior",
    category: "Exterior Paint",
    color: "Ivory White",
    size: "5L",
    price: 2399,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098136/download_oooani.jpg",
    description: "Smart exterior paint with self-cleaning properties."
  },
  {
    id: 33,
    name: "Dulux Crystal Coat",
    category: "Exterior Paint",
    color: "Snow White",
    size: "15L",
    price: 2899,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098247/download_oigkgi.jpg",
    description: "Crystal-clear protection and color brightness."
  },
  {
    id: 35,
    name: "Dulux Rain Blocker",
    category: "Exterior Paint",
    color: "Sky Blue",
    size: "10L",
    price: 2799,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098280/download_flgadx.jpg",
    description: "Blocks water penetration and prevents dampness."
  },

  // Brushes
  {
    id: 41,
    name: "Dulux Flat Brush",
    category: "Brush",
    size: "2 inch",
    price: 149,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075392/th_vogrfl.jpg",
    description: "Ideal for flat surfaces and large coverage."
  },
  {
    id: 42,
    name: "Dulux Angular Brush",
    category: "Brush",
    size: "1.5 inch",
    price: 129,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747074497/500x500_58926_d7aeabd292b2214f3505cd9781065d18_1000x10001428503941duluxbrushset._ekira4.jpg",
    description: "Perfect for corners and edges."
  },
  {
    id: 43,
    name: "Dulux Round Brush",
    category: "Brush",
    size: "1 inch",
    price: 99,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075492/th_ktjh2i.jpg",
    description: "Used for detailing and narrow spaces."
  },
  {
    id: 44,
    name: "Dulux Premium Wall Brush",
    category: "Brush",
    size: "4 inch",
    price: 199,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075526/dulux-proof-wall-75mm_a3nbj8.webp",
    description: "High quality bristles for smooth application."
  },
  {
    id: 45,
    name: "Dulux Trim Brush",
    category: "Brush",
    size: "1.5 inch",
    price: 119,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075565/61TWfUB7EML_je1cso.jpg",
    description: "Precision for trims and molding."
  },
  {
    id: 46,
    name: "Dulux Wood Finish Brush",
    category: "Brush",
    size: "2 inch",
    price: 159,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075602/acrylic-brushes_kofyue.avif",
    description: "Designed for varnish and wood coats."
  },

  {
    id: 49,
    name: "Dulux Wall Roller Brush",
    category: "Brush",
    size: "6 inch",
    price: 299,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075673/51ozat-kEXL._AC_SL1001__u4urig.jpg",
    description: "Efficient for large flat walls."
  },
  
  {
  id: 101,
  name: "Dulux Metallic Silver",
  category: "Metallic Paint",
  color: "Silver",
  size: "1L",
  price: 899,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098478/download_ediwza.jpg",
  description: "Shimmering silver finish for accent walls and decor."
},
{
  id: 102,
  name: "Dulux Metallic Gold",
  category: "Metallic Paint",
  color: "Gold",
  size: "1L",
  price: 999,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098629/images_iyelpb.jpg",
  description: "Luxurious gold metallic paint for a premium look."
},
{
  id: 103,
  name: "Dulux Metallic Bronze",
  category: "Metallic Paint",
  color: "Bronze",
  size: "1L",
  price: 950,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098661/download_jan1cw.jpg",
  description: "Warm bronze metallic for unique highlights."
},
{
  id: 104,
  name: "Dulux Metallic Copper",
  category: "Metallic Paint",
  color: "Copper",
  size: "1L",
  price: 970,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098690/download_n705qs.jpg",
  description: "Rich copper metallic for creative finishes."
},
{
  id: 105,
  name: "Dulux Metallic Blue",
  category: "Metallic Paint",
  color: "Blue",
  size: "1L",
  price: 920,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098721/images_px007d.jpg",
  description: "Cool blue metallic for modern interiors."
},

// Wood Paints
{
  id: 111,
  name: "Dulux Wood Finish Mahogany",
  category: "Wood Paint",
  color: "Mahogany",
  size: "1L",
  price: 799,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098763/81_nDF1acOL_us8ryg.jpg",
  description: "Deep mahogany finish for wooden surfaces."
},
{
  id: 112,
  name: "Dulux Wood Finish Teak",
  category: "Wood Paint",
  color: "Teak",
  size: "1L",
  price: 820,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098801/download_zn7mn9.jpg",
  description: "Classic teak wood paint for furniture and doors."
},
{
  id: 113,
  name: "Dulux Wood Finish Walnut",
  category: "Wood Paint",
  color: "Walnut",
  size: "1L",
  price: 830,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098860/download_xgpag7.jpg",
  description: "Rich walnut color for a premium wood look."
},
{
  id: 114,
  name: "Dulux Wood Finish Oak",
  category: "Wood Paint",
  color: "Oak",
  size: "1L",
  price: 810,
  image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747098801/download_zn7mn9.jpg",
  description: "Natural oak shade for all wood surfaces."
},



  // Putty Products
  {
    id: 61,
    name: "Dulux Acrylic Wall Putty",
    category: "Putty",
    size: "5kg",
    price: 449,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747074403/2774f43ecc4e30621353fd4e77db135b_qemb46.png",
    description: "Smooth finish with excellent adhesion."
  },
  {
    id: 62,
    name: "Dulux Cement Wall Putty",
    category: "Putty",
    size: "10kg",
    price: 749,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747074983/dulux-wall-putty-250x250_gx71jj.webp",
    description: "Cement-based putty for strong surface protection."
  },
  {
    id: 63,
    name: "Dulux White Finish Putty",
    category: "Putty",
    size: "10kg",
    price: 699,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075252/dulux-emulsion-paints-500x500_dub8qc.webp",
    description: "Bright white putty with excellent smoothness and crack resistance."
  },
  {
    id: 65,
    name: "Dulux Premium Wall Putty",
    category: "Putty",
    size: "10kg",
    price: 849,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075293/th_e1lkun.jpg",
    description: "Provides superior finish and better paint adherence."
  },
  {
    id: 66,
    name: "Dulux Interior Smooth Putty",
    category: "Putty",
    size: "5kg",
    price: 429,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075156/th_hg7tth.jpg",
    description: "Designed specifically for interior wall smoothness."
  },
  {
    id: 67,
    name: "Dulux Waterproof Wall Putty",
    category: "Putty",
    size: "10kg",
    price: 899,
    image: "https://res.cloudinary.com/dyxu6ylng/image/upload/v1747075099/dulux-aquatech-waterproof-wall-putty-500x500_zmh90v.webp",
    description: "Moisture-resistant putty for bathrooms and kitchens."
  },
]

// Export paintProducts outside the component
export const paintProducts = allProducts.filter(
  p => p.category.includes('Paint')
);

const ProductCatalog = () => {
  // State for filters and products
  const [products, setProducts] = useState(allProducts)
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    metallic: '',
    wood: ''
  })
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique values for filter options
  const categories = [...new Set(allProducts.map(product => product.category))]
  const colors = [...new Set(allProducts
    .filter(product => product.category.includes('Paint'))
    .map(product => product.color)
    .filter(Boolean))]

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts]
    
    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => product.category === filters.category)
    }
    
    // Apply color filter (only for paint products)
    if (filters.color) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.includes('Paint') && product.color === filters.color
      )
    }

    // Apply metallic paint filter
    if (filters.metallic) {
      filteredProducts = filteredProducts.filter(
        product => product.category === 'Metallic Paint' && product.color === filters.metallic
      );
    }

    // Apply wood paint filter
    if (filters.wood) {
      filteredProducts = filteredProducts.filter(
        product => product.category === 'Wood Paint' && product.color === filters.wood
      );
    }
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'price-low') {
        return a.price - b.price
      } else if (sortBy === 'price-high') {
        return b.price - a.price
      }
      return 0
    })
    
    setProducts(filteredProducts)
  }, [filters, sortBy])

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      color: '',
      metallic: '',
      wood: ''
    });
    setSortBy('name');
  }

  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Interior Paint':
        return <FaPaintRoller />
      case 'Exterior Paint':
        return <FaHome />
      case 'Brushes':
        return <FaPaintBrush />
      case 'Tools':
        return <FaTools />
      case 'Putty':
        return <FaPalette />
      default:
        return <FaPaintRoller />
    }
  }

  return (
    <div className="bg-light min-h-screen">
      {/* Page Header */}
      <div className="bg-dark text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Paint Products & Supplies</h1>
          <p className="text-xl">Everything you need for your painting project.</p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden flex items-center justify-center bg-white p-4 rounded-md shadow-sm mb-4"
            onClick={toggleFilters}
          >
            <FaFilter className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-primary hover:underline"
              >
                Clear All
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <select 
                className="w-full p-2 border rounded-md"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <select 
                className="w-full p-2 border rounded-md"
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
              >
                <option value="">All Colors</option>
                {colors.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Metallic Paint Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Metallic Paints</h3>
              <select
                className="w-full p-2 border rounded-md"
                value={filters.metallic || ''}
                onChange={e => handleFilterChange('metallic', e.target.value)}
              >
                <option value="">All Metallic Paints</option>
                {allProducts
                  .filter(p => p.category === 'Metallic Paint')
                  .map(p => p.color)
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((color, idx) => (
                    <option key={idx} value={color}>{color}</option>
                  ))}
              </select>
            </div>

            {/* Wood Paint Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Wood Paints</h3>
              <select
                className="w-full p-2 border rounded-md"
                value={filters.wood || ''}
                onChange={e => handleFilterChange('wood', e.target.value)}
              >
                <option value="">All Wood Paints</option>
                {allProducts
                  .filter(p => p.category === 'Wood Paint')
                  .map(p => p.color)
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((color, idx) => (
                    <option key={idx} value={color}>{color}</option>
                  ))}
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{products.length} products</p>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sort by:</span>
                <select 
                  className="p-2 border rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="card group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        {getCategoryIcon(product.category)}
                        <span className="ml-2">{product.category}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <span className="bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">₹{product.price}</span>
                      </div>
                      <div className="mb-2 text-sm text-gray-700 font-medium">
                        {product.size}
                      </div>
                      {product.color && (
                        <div 
                          className="w-8 h-8 rounded-full mb-3"
                          style={{ backgroundColor: product.color.toLowerCase().replace(' ', '') }}
                          title={product.color}
                        ></div>
                      )}
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products match your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog