import React from 'react';

// every component fn/class receives props :D

const Toppings = (props) => {
  const { toppings } = props;
  return <p>{toppings}</p>;
};

// why can we destructure directly?
// because, every functional component receives props in its params block
// function MyComponent(props){ return < JSX /> }

const PizzaList = (props) => {
  const { pizzaList } = props;

  // behind the scenes React is comparing its 'image' of the DOM with the actual DOM as it exists right now
  // this process is called reconciliation, and it basically involves us driving current state toward the ideal, and it's optimized to only change the DOM nodes (and subtrees of those nodes) that have actually changed between renders
  // in order for react to reconcile the virtual/actual DOMs, it needs to know how to compare all of these nodes and it does this through an internal property called a key
  // in lists, since we're functionally generating (or declaring) how we want our list to be rendered, we have to supply the key ourselves
  // keys in lists are generally the object id, where the object is whatever portion of the array we're currently in as we map over it

  const pizzaListJSX = pizzaList.map((pizza) => {
    const toppings = pizza.toppings.length
      ? pizza.toppings.join(', ')
      : '(no toppings)';

    return (
      // keep your view as pure as you can, extract any conditional logic to variables :D
      <div key={pizza.id}>
        <li>
          <h2>{pizza.name}</h2>
        </li>
        <Toppings toppings={toppings} />
      </div>
    );
  });

  return <ul>{pizzaListJSX}</ul>;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzaList: [],
    };
  }

  // react renders your component twice on initial mount
  // the first time, state is initialized, but the lifecycle method below has not run yet -- which means that pizzaList will be whatever value we initialize it as on first render -- we're trying to use that pizzaList in the child component by mapping over it, but .map() is ONLY a property of arrays in JS, so we're effectively calling null.map()

  componentDidMount() {
    this.setState({
      pizzaList: [
        { id: 1, name: 'cheese', toppings: [] },
        { id: 2, name: 'hawaiian', toppings: ['pineapple', 'cooked ham'] },
        { id: 3, name: 'mushroom', toppings: ['mushroom'] },
        {
          id: 4,
          name: 'squid-chorizo-rocket',
          toppings: ['squid', 'chorizo', 'rocket'],
        },
      ],
    });
  }

  render() {
    return (
      <section>
        {/* we could pass a prop or 'property' down to our child component through key-val pairs defined on the inline-invocation of our child component: child components are any component rendered by another parent component */}
        <PizzaList pizzaList={this.state.pizzaList} />
      </section>
    );
  }
}
