import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

// STUFF FROM ANOTHER LECTURE
// const root = ReactDOM.createRoot(document.getElementById('root')); // selects the element with id root made in index.html
// root.render( // renders the root element selected above
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  // we use class and NOT className in JSX
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // example of styling with the JS.
  // we can also use css files. Like how we imported the index.css file - and now that changes a lot of things in our application.
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length; // if the pizzas array was empty, it would still render the ul because an empty array is a truthy value still.

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {/* rendering lists with the map method - always have a boolean value as the condition for rendering becuase react doesn't render bool values but is fine rendering others. So if we just checked numPizzas, then react would render 0 even if it short cuircuited becuase 0 is an integer and not a bool value*/}
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizzaObject={pizza} key={pizza.name} />
            // need to pass a unique key to each element rendered with the map method.
            // need to use map because it creates a new array with the pizzas and we can't use for each because an array is not created.
          ))}
        </ul>
      ) : (
        <p>We are still working on this menu. Please come back later</p>
      )}

      {/* CONDITIONAL RENDERING OPTIONS */}
      {/* OPTION 1: Use the AND operator and short cruicuitng stuff (so condition on the left and then the stuff u want to return/do on the right) */}
      {/* OPTION 2 [like this one]: Use the TERNARY OPERATOR*/}
      {/* OPTION 3: MULTIPLE RETURNS */}

      {/* <Pizza
        // passing in props
        name="Pizza Spinaci"
        ingredient="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        // price="10" // we can pass in the price as a number by passing in JS so we don't have to pass in strings and stuff. SO use JS when passing in something that isn't a string.
        price={10}
      />
      <Pizza
        // passing in props. Order in which we pass in the props doesn't matter (since its an object and stuff). You can pass ANYTHING into props like other reacts, objects, arrays, etc.
        name="Pizza Funghi"
        ingredient="Tomato, mushrooms"
        price={12}
        photoName="pizzas/funghi.jpg"
      /> */}
    </main>
  );
}

function Pizza(props) {
  // example of multiple/early returns - because this is one component and if its sold out we don't want to render anything. And the pizza list uses multiple of these components, so it isn't going to affect the entire page.
  // this is about rendering an ENTIRE component or not, not for a specific element - use ternary operator for that
  if (props.pizzaObj.soldOut) return null;

  // the props object contains all the data and stuff that we give to the component. it's an OBJECT so we use it like a normal object.
  return (
    <li className="pizza">
      <img src={props.pizzaObject.photoName} alt={props.pizzaObject.name} />
      <div>
        <h3>{props.pizzaObject.name}</h3>
        <p>{props.pizzaObject.ingredient}</p>
        <span>{props.pizzaObject.price + 3}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  // else alert("We're currently closed!"); // alert is blocking so nothing renders until you click ok. And we also saw the alert rendering twice and that's becuase of the strict mode component rendering thiings twice to check for errors.
  // return React.createElement("footer", null, "We're currently open"); // react create element syntax

  // conditional rendering with multiple returns - this is will return this part and not the other stuff in the return statement (this is like naearly return and stuff) - so sometimes not helpful at all. It's more for like rendering entire domponents and not pieces of JSX that make up a component.
  if (!isOpen) return <p>We're happy to welcome you between this time</p>;

  return (
    <footer className="footer">
      {/* {new Date().toLocaleTimeString}, We're currently open! */}
      {/* conditional rendering with the and operator utilizing short curcuiting  - changed to the and operator. */}
      {isOpen ? (
        <Order closeHours={closeHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

// example of taking a piece of JSX from a component and making another component for a small section in case the original component is getting too big.
function Order(props) {
  return (
    <div className="order">
      <p>
        We're open until {props.closeHours}:00. Come visit us or order online.{" "}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// Render app in react version 18
const root = ReactDOM.createRoot(document.getElementById("root")); // selecting the root element from html because everything is going to be rendered inside this div by react
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // render the actual app. strict mode component helps for rendering all components twice to check for errors when developing and makes sure that we are using the react library stuff. So include this element.

// react before version 18 to render the root
// ReactDOM.render(<App />, document.getElementById("root")); // and you import react from react-dom/client

// tips for debugging
// make sure the project is running so with reloading and stuff
// open terminal and console always to see errors and stuff
// react dev tools (talking about that later)
// use eslint (on by default and stuff)
// check output in the tab at the bottom of vs code to check for output from specific extensions and stuff

// components are what react are made of. We combine components to make up the ui - each peice has its down data, logic, and appearance. Reuse and nesting components is good.
// component trees can be helpful for identifying how nesting components and stuff should be. Parent and child components are used and stuff.

// JSX NOTES
// JSX - extension of JS allowing us to write html, css, and js inside this. every component does this. Babel converts the html code to the react create element code like what we wrote in the pure react section
// imperative - manual DOM element selections and traversing. Telling browser how to do things.
// declarative - describe what the ui should look like using JSX based on the current data and we do this without needing to manipulate the the DOM directly (we DON'T TOUCH IT AT ALL - big abstraction away from the DOM). UI is a reflection of the current data

// seperation of concerns - js, html, css - one per file
// then with rise of interactive SPAs-> JS in charge of HTML more now and since logic and ui are so closely coupled together in modern web apps - why keep them seperated from each other?
// colocated means same file. HTML and JS and stuff are in the same file with the JSX. (css too since inline styling and stuff).
// there is still seperation of concerns with one COMPONENT per file and not one tech per file anymore.
// react is more of a library than a framework so it doesn't care about how we style things, etc.

// for styling: we can use the style property in html and then use a JS object for the properties. Properties are in camel case with no dashes.

// PROPS NOTES
// pass data from parent to child components
// like function parameters
// can pass anything in to props, even other react components.
// props are READ ONLY and cannot be changed by the child component - IMMUTABLE (is feel u need to change props then use STATE - just an object since if change it in child, it will change the parent too) -. makes a side effect since that effects the parent as well. React uses pure functions when it is about state and stuff. SO A FUNCTION SHOULD NEVER MUTATE SOMETHING OUTSIDE ITS FUNCTION SCOPE
// component is made up by data (props - from parent component who owns the data and ONLY parent component, sate, and some other things), logic, and appearance.
// ONE WAY DATA FLOW: data can only be passed from parent to child and never the other way. -> other frameworks like angular have two way
// reasons for this: applications are predictable and easy to understand, easy to debug, two way data is less performant.
// clever way to get data up to the parent and stuff and we will talk about this in the next section.

// JSX RULES
// jsx rules: like html, curly braces with JS mode - only expressions inside - returns value(s), NO STATEMENTS like if, for, etc. We can
// a piece of JSX prodcues a JS expression. (jsx converted to a create element finction call in js) so we can put jsx stuff inside of curly braces in js (since JSX is a JS expression). We can write JSX anywhere like assigning to variables etc. JSX pieces can obly have one root element and if u need more you can use a react fragment.
