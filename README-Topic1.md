# Topic 1: Introduction to React

## Basic "Syntax"


```jsx
// You don't write this code by hand. You build the pieces. 
// React combines them to create the final output. 

<App>
  <Header>
    <Navigation />
    <SearchBar />
  </Header>

  <MainContent>
    <Article title="Welcome to React!" />
    <Article title="Understanding Components" />
  </MainContent>

  <Footer />
</App>
```

> **Note:** This structure clearly shows how the application is a tree of nested, descriptive components.

## Complex "Example" (Conceptual) 

Imagine a dynamic e-commerce product dashboard. 

The Scenario: You have a <FilterSidebar> component with checkboxes for "Brand" and "Price Range". You also have a <ProductGrid> component that displays a list of products. 

### The Old Way (Imperative): When a checkbox is clicked, you would have to write manual JavaScript to: 

> **Imperative steps (DOM-based):**
>
> - Find the ProductGrid in the DOM.
> - Loop through all the products.
> - Check if each product matches the new filter.
> - Manually hide or show each product element one by one.
> 

> **The React Way (Declarative):** 
>
> - The filter checkboxes update a filters state variable. 
> - The <ProductGrid> component is simply told to "render the products that match the current filters state." 
> 
> That's it. React automatically and efficiently calculates the differences and updates only the necessary parts of the ProductGrid. You describe the end result, and React handles the complex steps to get there.
> 