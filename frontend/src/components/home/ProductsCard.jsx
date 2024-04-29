import ProductSingleCard from "./ProductSingleCard";

export default function ProductsCard({ products }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
                <ProductSingleCard key={item._id} product={item} />                
            ))}
        </div>
    )
}
