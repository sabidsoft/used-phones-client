import React from 'react';
import Footer from '../components/Footer';

const Blogs = () => {
    return (
        <>
            <div className='max-w-[1440px] mx-auto px-5 lg:px-0 mb-20'>
                <h1 className='text-center text-5xl mt-20 mb-10'>Blogs</h1>
                <div className='shadow-lg rounded-lg p-10 mb-20'>
                    <h1 className='text-center text-3xl font-bold mb-10'>What are the different ways to manage a state in a React application?</h1>
                    <p className='mb-5'>In React apps, there are many ways to handle the state. Let us briefly explore a few of them in this part.</p>

                    <h5 className='text-xl font-bold mb-5'>Web Storage:</h5>
                    <p className='mb-5'>The second option is to store the state in the browser via web storage. This is useful when we want to persist state between reloads and reboots. Examples include cookies, local storage, and IndexedDB. These are native browser technologies. Data persisted in the browser is tied to a single browser. So, if the user loads the site in a different browser, the data will not be available. We avoid storing sensitive data in the browser since the user may access the app on a shared machine. Some examples of where web storage might be most useful include storing a user's shopping cart, saving partially completed form data or storing JWT token in HttpOnly Cookie.
                    </p>

                    <h5 className='text-xl font-bold mb-5'>Lifted State:</h5>
                    <p className='mb-5'>The Fourth option is to define the state in the parent component. Often, the same state is used across multiple components. In those cases, it is useful to lift the state to a common parent. The lifting state is a two-step process. First, we declare the state in a common parent component, and then we pass the state down to child components via props. This pattern should be considered any time a few related components need to use the same state. The lifting state avoids duplicating states in multiple components. It helps to assure that our components all consistently reflect the same state.
                    </p>

                    <h5 className='text-xl font-bold mb-5'>Derived State:</h5>
                    <p className='mb-5'>The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty. So, why bother deriving the state? Well, deriving the state avoids our state values getting out of sync. It simplifies our code since we do not have to remember to keep separate values in sync. When we update the state, derived values are automatically recalculated in the render. For example, we can calculate the items added to the cart and show it on the cart icon like this, this.state.cart.items.length and pass it as a prop to Badge Component. We do not need to store the itemsCount key in a cart state. Each time the cart state gets changed, the count on the Badge will be calculated automatically.
                    </p>

                    <h5 className='text-xl font-bold mb-5'>Derived State:</h5>
                    <p className='mb-5'>The fifth option is to compute the new state based on the available state and we do not need to declare a state at all. If there are existing values that can be composed to give us the information we need, then we can calculate that information on each render instead of storing it. Some examples include calling .length on an array to determine the number of records instead of storing a separate numItems variable in the state or deriving an errorsExist boolean by checking if the errors array is empty. So, why bother deriving the state? Well, deriving the state avoids our state values getting out of sync. It simplifies our code since we do not have to remember to keep separate values in sync. When we update the state, derived values are automatically recalculated in the render. For example, we can calculate the items added to the cart and show it on the cart icon like this, this.state.cart.items.length and pass it as a prop to Badge Component. We do not need to store the itemsCount key in a cart state. Each time the cart state gets changed, the count on the Badge will be calculated automatically.
                    </p>
                </div>

                <div className='shadow-lg rounded-lg p-10 mb-20'>
                    <h1 className='text-center text-3xl font-bold mb-10'>How does prototypical inheritance work?</h1>
                    <p>JavaScript is a bit confusing for developers experienced in class-based languages (like Java or C++), as it is dynamic and does not have static types. When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain. It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like static dispatching do not exist in JavaScript. While this confusion is often considered to be one of JavaScript's weaknesses, the prototypical inheritance model itself is, in fact, more powerful than the classic model. It is, for example, fairly trivial to build a classic model on top of a prototypical model — which is how classes are implemented. Although classes are now widely adopted and have become a new paradigm in JavaScript, classes do not bring a new inheritance pattern. While classes abstract most of the prototypical mechanism away, understanding how prototypes work under the hood is still useful. JavaScript objects are dynamic "bags" of properties (referred to as own properties). JavaScript objects have a link to a prototype object. When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.</p>
                </div>

                <div className='shadow-lg rounded-lg p-10 mb-20'>
                    <h1 className='text-center text-3xl font-bold mb-10'>What is a unit test? Why should we write unit tests?</h1>
                    <h5 className='text-xl font-bold mb-5'>Unit Test:</h5>
                    <p className='mb-5'>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.</p>

                    <h5 className='text-xl font-bold mb-5'>We should write unit tests because of:</h5>
                    <li className='mb-5'>
                        Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could've been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system.
                    </li>
                    <li className='mb-5'>
                        Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.
                    </li>
                    <li className='mb-5'>
                        It simplifies the debugging process.
                    </li>
                    <li className='mb-5'>
                        Unit testing is an integral part of extreme programming. Extreme programming is basically a “test-everything-that-can-possibly-break” programming strategy.
                    </li>
                    <li className='mb-5'>
                        Unit tests make code reuse easier. If you want to reuse existing code in a new project, you can simply migrate both the code and tests to your new project, then run your tests to make sure you have the desired results.
                    </li>
                    <li className='mb-5'>
                        Unit testing improves code coverage. A debatable topic is to have 100% code coverage across your application.
                    </li>
                    <li className='mb-5'>
                        In the testing pyramid, unit tests are faster than integration and end-to-end. They are more assertive and return quick feedback.
                    </li>
                </div>

                <div className='shadow-lg rounded-lg p-10'>
                    <h1 className='text-center text-3xl font-bold mb-10'>React vs. Angular vs. Vue?</h1>
                    <h5 className='text-xl font-bold mb-5'>React vs. Angular vs. Vue:</h5>
                    <li className='mb-5'>
                        React developed by Facebook, Angular developed by Google and Vue developed by Community.
                    </li>
                    <li className='mb-5'>
                        Framework Size React 143k, Angular 43k and Vue 23k.
                    </li>
                    <li className='mb-5'>
                        Initial Release React October 20, 2010, Angular May 29, 2013 and Vue February 2014.
                    </li>
                    <li className='mb-5'>
                        Programming language React Typescript, Angular JavaScript and Vue JavaScript.
                    </li>
                    <li className='mb-5'>
                        Learning curve React Steep, Angular Moderate and Vue Moderate.
                    </li>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Blogs;