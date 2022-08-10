# element-js

Element.js is web front-end development from a real OOP perspective, where we create real OOP classes.

## Prerequisites

For this library to work, jQuery library is required, under which it works.

## Idea

Web Front-end development is often visually very different from programming, e.g. .NET C# programming language or Java, which makes it quite difficult for Back-end and other programmers to switch to it. Although jQuery is a good library, the readability of its code is quite poor. And you want to have real OOP classes, not objects, when real OOP classes are supported in JavaScript since ES6 (EcmaScript6), but most jQuery libraries are still built in an old fashioned way.

More than three years ago, while working in a company, developing a 3-year project, I had the idea to use the good old principle of Windows component programming, when the entire user interface is formed from components or elements that can be integrated into each other. In the case of this library, the base class of each such element will be inherited from this library class, which will already contain the backbone of working with the HTML part and where you will only have to implement the business logic itself.

In this way, each element is separated into a separate class or file with its own business logic, which is very similar to programming on the Microsoft platform, as well as creating real OOP classes in JavaScript is easy to read and understand even for C# or Java programmers.

This small library can overthrow mountains, as we found out during our project. However, I cannot make the original version of the library public, which is why I decided to create a second generation version of it in the form of open source.

In sum, it is one file, one base class on which the entire Web project is built.

P.S.

I want this library to be available to everyone, both commercial and non-commercial entities. This is an approach to Front-end programming from a slightly different, more human and easier-to-understand perspective for a person or a programmer.

## Project status

Under development.