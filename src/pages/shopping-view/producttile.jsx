import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addToCart } from "@/store/shop/cart/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react"; // optional spinner

function ShoppingProductTile({ id, product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Local loading for this tile only
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await dispatch(
        addToCart({
          userId: user?.id,
          productId: product?._id,
          quantity: 1,
        })
      );
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
      <div>
        <div className="relative" id={id}>
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white hover:text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Sale
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product?.title}</h2>
        <div className="flex justify-center items-center mb-3 gap-2">
          <span className="text-sm text-gray-500 italic">
            {product?.category}
          </span>
          <span className="text-sm text-gray-500 italic">|</span>
          <span className="text-sm text-gray-500 italic">{product?.brand}</span>
        </div>
        <div className="flex justify-center items-center mb-3 gap-2">
          <span
            className={`${
              product?.salePrice > 0
                ? "line-through text-gray-500"
                : "text-gray-800"
            } text-lg font-medium`}
          >
            ${product?.price.toFixed(2)}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-semibold text-green-600">
              ${product?.salePrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-black hover:bg-primary-dark text-white py-2 rounded-lg transition-colors"
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
