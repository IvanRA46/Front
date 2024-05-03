import { useEffect, useState } from "react";

function Test1(){
    const [product, setProduct] = useState<any>(null)

    useEffect(() => {
        fetch("http://localhost:3010/api/v1/motos/findFirst")
        .then((res) => res.json())
        .then((data) => setProduct(data))
    }, [])

    return (
        <div>
        {product && (
            <p>{product.name}</p>
        )}
        </div>
    )
}

export default Test1