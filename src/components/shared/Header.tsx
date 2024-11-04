
const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-red-500">Tinder</a>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/products" className="text-gray-600 hover:text-gray-800">Products</a></li>
            <li><a href="/learn" className="text-gray-600 hover:text-gray-800">Learn</a></li>
            {/* Add more navigation links */}
          </ul>
        </nav>
        <div>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;