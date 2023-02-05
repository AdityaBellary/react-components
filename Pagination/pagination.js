import { useEffect, useState } from "react";
import './pagination.css';

function Pagination() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()

    const fetchProducts = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
        const data = await res.json()
        if (data && data.products) {
            setProducts(data.products)
            setTotalPages(data.total / 10)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [page])

    const selectPageHandler = (i) => {
        if (i >= 1 && i <= totalPages) {
            console.log(i)
            setPage(i)
        }
    }

    return (
        <div>
            {products.length > 0 && <div className="products">
                {products.map((prod) => {
                    return <div key={prod.id} className="products__single">
                        <img src={prod.thumbnail} alt={prod.title}></img>
                        <span>{prod.title}</span>
                    </div>
                })}
            </div>}
            {products.length > 0 && <div className="pagination">
                <span className={page === 1 ? "pagination_disable" : ""} onClick={() => selectPageHandler(page - 1)}>prev</span>
                {[...Array(totalPages)].map((_, i) => {
                    return <span className={page === i + 1 ? "selected": ""} key={i} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
                })}
                <span className={page === totalPages ? "pagination_disable" : ""} onClick={() => selectPageHandler(page + 1)}>next</span>
            </div>
            }
        </div>
    )
}

export default Pagination