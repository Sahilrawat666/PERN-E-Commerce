import ProductCard from "../components/ProductCard.jsx";
import { useProducts } from "../src/context/ProductContext.jsx";

function Shop() {
  const { products, productsLoading, productsError } = useProducts();

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <section className="border-b border-[#ddd5cc] px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            LUXE Collection
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
            Shop
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#81776e]">
            Discover thoughtfully designed essentials created for a refined,
            modern wardrobe.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {productsLoading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd5cc] border-t-[#b08d57]" />

                <p className="mt-4 text-sm text-[#81776e]">
                  Loading collection...
                </p>
              </div>
            </div>
          )}

          {productsError && !productsLoading && (
            <div className="py-20 text-center">
              <p className="text-sm text-red-600">{productsError}</p>
            </div>
          )}

          {!productsLoading && !productsError && products.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-[#81776e]">No products available.</p>
            </div>
          )}

          {!productsLoading && !productsError && products.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-14">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Shop;
