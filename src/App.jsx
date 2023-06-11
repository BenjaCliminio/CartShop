import React, {
	useState,
	useEffect,
} from "react";
import "./style/main.css";
import Footer from './Components/Footer'
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
		name: "El Monje Que Vendio su Ferrari",
		rating: 4.6,
		description:
			"El monje que vendió su Ferrari es un libro escrito por Robin Sharma que nos sumerge en la historia de Julian Mantle, un exitoso abogado cuya vida cambia drásticamente...",
		price: 25,
		image: "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/508491.jpg",
	},
	{
		id: 4,
		name: "Las 48 Leyes del Poder",
		rating: 3,
		description:
			"escrito por Robert Greene, es un estudio profundo sobre las dinámicas del poder y cómo influir en los demás. A través de ejemplos históricos y anécdotas cautivadoras",
		price: 40,
		image: "https://pre.tematika.com/media/catalog/Ilhsa/Imagenes/664809.jpg",
	},
	{
		id: 5,
		name: "El arte que todo te importe un Carajo",
		rating: 2.5,
		description:
			"es una obra escrita por Mark Manson que desafía convenciones sociales y nos lleva a cuestionar nuestras prioridades y valores. ",
		price: 23,
		image: "https://images.cdn2.buscalibre.com/fit-in/360x360/ff/2e/ff2e09751f6884757d4d5f25fd7579fb.jpg"
	},
	{
		id: 6,
		name: "El club de las 5AM",
		rating: 2.7,
		description:
			" es una obra de Robin Sharma que nos revela los beneficios de levantarnos temprano y aprovechar las primeras horas del día para potenciar nuestra productividad y calidad de vida.",
		price: 32,
		image: "https://image.cdn0.buscalibre.com/5c81b76f14c761f96b8b4567.RS500x500.jpg",
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
			<div className="flex justify-between h-18 p-4 w-full shadow-xl ">
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
				<h2 className="mt-3 mb-4 font-bold text-xl">
				<span className="text-red-600">Legendarys Books</span> we are lovers of the heart of reading and the high power that it has to be able to learn and face the challenges that society poses to us every day
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
					<Footer />
				</div>
			</main>
		</div>
	);
}

export default App;