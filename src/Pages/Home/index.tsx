import { FruitsSection, MenuSection, ShowcaseBanner, } from "../../components"

const Home = () => {
  return (
    <div className='flex w-full h-auto flex-col items-center justify-center '>
      {/* Hero Section with enhanced spacing */}
      <div className="w-full px-4 md:px-8 lg:px-16 py-8">
        <ShowcaseBanner />
      </div>
      
      {/* Features Section */}
      <div className="w-full py-4">
        <FruitsSection />
      </div>
      
      {/* Menu Section */}
      <div className="w-full py-4">
        <MenuSection />
      </div>
    </div>
  )
}

export default Home