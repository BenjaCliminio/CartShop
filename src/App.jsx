import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./Components/RatingStars";
import ShoppingCart from "./Components/ShoppingCart";

const products = [
	{
		name: "Todo esta Jodido",
		rating: 4.3,
		description:
			"Todo esta Jodido es una obra donde Mark Manson habla sobre la falta de esperanza que hay en el mundo",
		price: 30,
		image: "https://www.rocalibros.com/archivos/imagenes/mayores/4590.jpg"
	},
	{
		id: 2,
		name: "La Vaca Purpura",
		rating: 3.2,
		description:
			"La Vaca Purpura es un libro escrito por el experto en Marketing Seth Godin, donde nos explica como diferenciarnos de los demas",
		price: 18,
		image: "https://m.media-amazon.com/images/I/71sREdEjGiL._AC_UF1000,1000_QL80_.jpg",
	},
	{
		id: 3,
		name: "Etiam volutpat aliquam",
		rating: 3.2,
		description:
			"Praesent et orci vel nunc interdum aliquet et non dolor. Etiam eget finibus justo",
		price: 99,
		image: "./assets/images/product-3.png",
	},
	{
		id: 4,
		name: "Lorem ipsum dolor",
		rating: 4.8,
		description:
			"Duis nibh sapien, placerat non nulla ac, suscipit laoreet tortor.",
		price: 119,
		image: "./assets/images/product-4.png",
	},
	{
		id: 5,
		name: "Ultrices nisl",
		rating: 4.5,
		description:
			"Phasellus condimentum, ante et dictum placerat, nulla ipsum commodo lorem, ut mollis nibh turpis a metus.",
		price: 85,
		image: "./assets/images/product-5.jpg",
	},
	{
		id: 6,
		name: "Curabitur in elementum tortor",
		rating: 3.8,
		description:
			" Mauris convallis diam nibh, non malesuada enim facilisis non. Etiam sapien augue, molestie a porta sed",
		price: 149,
		image: "./assets/images/product-6.png",
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="flex justify-between p-4 w-full shadow-xl ">
				<h3 className="font-bold text-xl">Legendarys Books</h3>
				<button
					className="flex text-black"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="flex justify-center font-bold text-xl">
								{product.price}$
							</span>
							<div className="buttons">
								<button className="border-none outline-none w-48 rounded-lg hover:bg-[#065a82] h-10 bg-gray-400 cursor-pointer">
									<span className="font-bold text-lg">Detail</span>
								</button>
								<button
									className="border-none outline-none w-48 rounded-lg hover:bg-[#065a82] h-10 bg-gray-400 cursor-pointer"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									<span className="font-bold text-lg">Add to Cart</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;