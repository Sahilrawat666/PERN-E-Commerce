import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { useProducts } from "../src/context/ProductContext.jsx";
// import { useSearchParams } from "react-router-dom";

function Shop() {
  const { products, productsLoading, productsError } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";

  const selectedCategory = searchParams.get("category");
  const selectedGender = searchParams.get("gender");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatches =
        !selectedCategory ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const genderMatches =
        !selectedGender ||
        product.gender?.toLowerCase() === selectedGender.toLowerCase();

      const searchMatches =
        !searchQuery ||
        product.name?.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery) ||
        product.category?.toLowerCase().includes(searchQuery) ||
        product.gender?.toLowerCase().includes(searchQuery);

      return categoryMatches && genderMatches && searchMatches;
    });
  }, [products, searchQuery, selectedCategory, selectedGender]);
  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <section className="border-b border-[#ddd5cc] px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Zenova Collection
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : selectedCategory ||
                (selectedGender ? `${selectedGender}'s Collection` : "Shop")}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#81776e]">
            {searchQuery
              ? `Showing products matching "${searchQuery}".`
              : selectedCategory
                ? `Explore our ${selectedCategory.toLowerCase()} collection.`
                : selectedGender
                  ? `Discover our curated selection for ${selectedGender.toLowerCase()}.`
                  : "Discover thoughtfully designed essentials created for a refined, modern wardrobe."}
          </p>
          {/* Active Filters */}
          {(selectedCategory || selectedGender) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {selectedGender && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d8cec3] bg-white px-4 py-2 text-sm text-[#302923]">
                  {selectedGender}

                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);

                      params.delete("gender");

                      setSearchParams(params);
                    }}
                    className="text-[#786f68] transition-colors hover:text-[#b08d57]"
                    aria-label="Remove gender filter"
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedCategory && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d8cec3] bg-white px-4 py-2 text-sm text-[#302923]">
                  {selectedCategory}

                  <button
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);

                      params.delete("category");

                      setSearchParams(params);
                    }}
                    className="text-[#786f68] transition-colors hover:text-[#b08d57]"
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-[#786f68] underline underline-offset-4 transition-colors hover:text-[#b08d57]"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {productsLoading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd5cc] border-t-[#b08d57]" />

                <p className="mt-4 text-sm text-[#81776e]">
                  Loading products...
                </p>
              </div>
            </div>
          )}

          {!productsLoading && productsError && (
            <div className="py-20 text-center">
              <p className="text-sm text-red-600">{productsError}</p>
            </div>
          )}

          {!productsLoading &&
            !productsError &&
            filteredProducts.length > 0 && (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-sm text-[#81776e]">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-14">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}

          {!productsLoading &&
            !productsError &&
            filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <h2 className="text-xl font-light text-[#302923]">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-[#81776e]">
                  Try removing one of your filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 text-sm text-[#b08d57] underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}

export default Shop;
