# element.js

Element.js is web front-end development from a real OOP perspective, where we create real OOP classes.

## Prerequisites

This library uses the jQuery library that it runs under.

## Idea

Web Front-end development is often visually very different from programming on e.g. .NET C#, Java or on other programming languages, which makes it quite difficult for Back-end and other programmers to switch to it, when they for many years working with plain OOP code. Although jQuery is a good library, the readability of code, which uses it is quite poor. And you probably want to have real OOP classes, not objects, when real OOP classes are supported in JavaScript since ES6 (EcmaScript6), but most jQuery libraries are still built in an old fashioned way, when normal OOP class syntax wasn't supported.

More than three years ago, while working in a company, developing a 3-year project, I had an idea to use the good old principle of Windows component programming, when the entire user interface is formed from components or elements that can be integrated into each other. In the case of this library, the base class of each such element will be inherited from this base Element class, which will already contain the backbone of working with the HTML DOM elements and where you will only have to implement the business logic itself.

In this way, each element is separated into a separate class or file with its own business logic, which is very similar to programming on the C#, Java and other programming languages, where developers developing classes with standart OOP syntax, rather than objects.

This small library can overthrow mountains, as we found out during our project. However, I cannot make the original version of the library public, which is why I decided to create a second generation version of it in the form of open source. With the help of this library, it is possible to create a front-end UI of high complexity, which consists of many elements, all of which can have their own business logic.

In sum, it is one file, one base class on which the entire Web project can be built.

P.S.

I want this library to be available to everyone, both commercial and non-commercial entities. This is an approach to Front-end programming from a slightly different, more human and easier-to-understand perspective.

## Project status

Under development.