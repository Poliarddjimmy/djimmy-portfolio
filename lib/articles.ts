export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readingTime: string
  tags: string[]
}

// Sample articles data - you can replace these with your actual articles
export const articles: Article[] = [
  {
    slug: "building-scalable-apis-with-rails",
    title: "Building Scalable APIs with Ruby on Rails",
    excerpt:
      "Learn how to design and implement scalable API architectures using Ruby on Rails with best practices for performance and maintainability.",
    content: `
# Building Scalable APIs with Ruby on Rails

Ruby on Rails has been a popular choice for building web applications for many years, and it's also an excellent framework for creating APIs. In this article, I'll share some best practices and techniques for building scalable APIs with Rails.

## Use Rails API Mode

When creating a new Rails application specifically for an API, you can use the \`--api\` flag to generate a more lightweight application:

\`\`\`bash
rails new my_api --api
\`\`\`

This will create a Rails application that's optimized for API development, without unnecessary middleware and features that are only needed for traditional web applications.

## Versioning Your API

API versioning is crucial for maintaining backward compatibility while allowing your API to evolve. There are several approaches to versioning, but one common method is to include the version in the URL:

\`\`\`ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
    end
  end
end
\`\`\`

This approach makes it clear to developers which version of the API they're using, and it allows you to maintain multiple versions simultaneously.

## JSON Serialization

For efficient JSON serialization, consider using a library like \`active_model_serializers\` or \`jsonapi-serializer\` (formerly \`fast_jsonapi\`). These libraries help you define how your models should be serialized to JSON, and they can significantly improve performance.

\`\`\`ruby
# app/serializers/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :created_at
  
  has_many :posts
end
\`\`\`

## Authentication and Authorization

For API authentication, consider using JWT (JSON Web Tokens) or OAuth. These standards provide secure ways to authenticate API requests without requiring session management.

\`\`\`ruby
# Gemfile
gem 'jwt'
\`\`\`

\`\`\`ruby
# app/controllers/api/v1/base_controller.rb
module Api
  module V1
    class BaseController < ApplicationController
      before_action :authenticate_request
      
      private
      
      def authenticate_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        
        begin
          @decoded = JWT.decode(header, Rails.application.secrets.secret_key_base)
          @current_user = User.find(@decoded[0]['user_id'])
        rescue JWT::DecodeError
          render json: { errors: ['Invalid token'] }, status: :unauthorized
        end
      end
    end
  end
end
\`\`\`

## Rate Limiting

To protect your API from abuse and ensure fair usage, implement rate limiting. The \`rack-attack\` gem is a great choice for this:

\`\`\`ruby
# Gemfile
gem 'rack-attack'
\`\`\`

\`\`\`ruby
# config/initializers/rack_attack.rb
class Rack::Attack
  throttle('req/ip', limit: 300, period: 5.minutes) do |req|
    req.ip
  end
end
\`\`\`

## Background Jobs

For time-consuming operations, use background jobs to avoid blocking API responses:

\`\`\`ruby
# app/controllers/api/v1/reports_controller.rb
def create
  @report = Report.new(report_params)
  
  if @report.save
    GenerateReportJob.perform_later(@report.id)
    render json: { message: 'Report generation started' }, status: :accepted
  else
    render json: { errors: @report.errors }, status: :unprocessable_entity
  end
end
\`\`\`

## Caching

Implement caching to improve performance for frequently accessed data:

\`\`\`ruby
# app/controllers/api/v1/products_controller.rb
def index
  @products = Rails.cache.fetch('products', expires_in: 1.hour) do
    Product.all.to_a
  end
  
  render json: @products
end
\`\`\`

## Conclusion

Building scalable APIs with Ruby on Rails requires careful planning and the use of appropriate tools and techniques. By following these best practices, you can create APIs that are maintainable, performant, and secure.

Remember that scalability isn't just about handling high traffic; it's also about creating a codebase that can grow and evolve over time. With Rails' convention-over-configuration philosophy and the rich ecosystem of gems, you have all the tools you need to build excellent APIs.
    `,
    coverImage: "/images/ruby.png",
    date: "2023-12-15",
    readingTime: "8 min read",
    tags: ["Ruby on Rails", "API", "Backend", "Performance"],
  },
  {
    slug: "nextjs-vs-react-choosing-the-right-tool",
    title: "Next.js vs React: Choosing the Right Tool for Your Project",
    excerpt:
      "A comprehensive comparison of Next.js and React to help you decide which framework is best suited for your web development project.",
    content: `
# Next.js vs React: Choosing the Right Tool for Your Project

When starting a new web development project, one of the first decisions you'll need to make is which framework to use. React and Next.js are both popular choices, but they serve different purposes and have different strengths. In this article, I'll compare these two technologies to help you make an informed decision.

## Understanding the Relationship

First, it's important to understand that Next.js is built on top of React. React is a JavaScript library for building user interfaces, while Next.js is a framework that provides additional structure, features, and optimizations for React applications.

## React: The Library

React, developed and maintained by Facebook, is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of these components efficiently.

### Pros of React:

1. **Flexibility**: React doesn't impose a specific project structure, giving developers the freedom to organize their code as they see fit.
2. **Ecosystem**: React has a vast ecosystem of libraries and tools that can be integrated as needed.
3. **Community**: With a large and active community, finding solutions to problems is usually straightforward.
4. **Learning Curve**: The core concepts of React are relatively easy to grasp, making it accessible for beginners.

### Cons of React:

1. **Configuration**: Setting up a React project from scratch requires configuring tools like Webpack, Babel, and routing libraries.
2. **SEO**: React applications render on the client side by default, which can be problematic for SEO.
3. **Performance**: Without proper optimization, React applications can suffer from performance issues, especially on mobile devices.

## Next.js: The Framework

Next.js, developed by Vercel, is a React framework that provides a structured approach to building React applications. It includes features like server-side rendering, static site generation, and API routes out of the box.

### Pros of Next.js:

1. **Server-Side Rendering (SSR)**: Next.js can render pages on the server, improving initial load times and SEO.
2. **Static Site Generation (SSG)**: Pages can be pre-rendered at build time, resulting in fast load times and reduced server load.
3. **File-Based Routing**: Next.js uses a file-based routing system, simplifying the process of creating new pages.
4. **API Routes**: Next.js allows you to create API endpoints as part of your application, eliminating the need for a separate backend in some cases.
5. **Zero Configuration**: Next.js comes with sensible defaults, reducing the need for complex configuration.

### Cons of Next.js:

1. **Less Flexibility**: The opinionated nature of Next.js means less flexibility in how you structure your application.
2. **Learning Curve**: While Next.js simplifies many aspects of React development, it introduces its own concepts that need to be learned.
3. **Deployment Considerations**: Server-side rendering requires a Node.js server, which can complicate deployment compared to static sites.

## When to Choose React

React might be the better choice when:

1. **You need maximum flexibility**: If your project has unique requirements that don't fit well with Next.js's conventions, React gives you the freedom to structure your application as needed.
2. **You're building a single-page application (SPA)**: If SEO isn't a concern and you're building an application that will be used primarily by logged-in users, a client-side rendered React application might be sufficient.
3. **You're integrating with an existing backend**: If you already have a robust backend that handles routing and data fetching, React can be used to build the frontend UI.

## When to Choose Next.js

Next.js might be the better choice when:

1. **SEO is important**: If your application needs to be discoverable by search engines, Next.js's server-side rendering capabilities are a significant advantage.
2. **You want faster initial load times**: Server-side rendering and static site generation can significantly improve the perceived performance of your application.
3. **You're building a content-heavy site**: Next.js's static site generation is perfect for blogs, documentation sites, and other content-focused applications.
4. **You want a full-stack solution**: Next.js's API routes allow you to build backend functionality alongside your frontend, potentially eliminating the need for a separate backend service.

## Conclusion

Both React and Next.js are excellent tools for building modern web applications. The choice between them depends on your specific requirements, team expertise, and project goals.

If you're starting a new project and SEO, performance, and developer experience are priorities, Next.js is often the better choice. Its built-in features save time and provide solutions to common challenges in web development.

However, if you need maximum flexibility or are working on a project with unique requirements, React's unopinionated approach might be more suitable.

Remember that you can always start with React and migrate to Next.js later if needed, as Next.js is built on top of React and shares the same core concepts.
    `,
    coverImage: "/images/next_and_react.png",
    date: "2023-11-20",
    readingTime: "10 min read",
    tags: ["React", "Next.js", "Frontend", "JavaScript"],
  },
  {
    slug: "mastering-typescript-for-better-code-quality",
    title: "Mastering TypeScript for Better Code Quality",
    excerpt:
      "Discover how TypeScript can improve your JavaScript development workflow and help you write more maintainable, error-free code.",
    content: `
# Mastering TypeScript for Better Code Quality

JavaScript has been the backbone of web development for decades, but its dynamic typing can sometimes lead to unexpected runtime errors and bugs that are difficult to track down. TypeScript, a superset of JavaScript developed by Microsoft, addresses these issues by adding static typing to the language. In this article, I'll explore how TypeScript can improve your code quality and development workflow.

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing and other features that help catch errors early in the development process. TypeScript code is transpiled to JavaScript, which means it can run anywhere JavaScript runs: in browsers, on Node.js servers, or in any JavaScript runtime.

## Benefits of TypeScript

### 1. Early Error Detection

One of the most significant advantages of TypeScript is its ability to catch errors during development rather than at runtime. The TypeScript compiler checks your code for potential issues before it's executed, which can save hours of debugging time.

For example, consider this JavaScript code:

\`\`\`javascript
function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

// This will throw an error at runtime if items is not an array or if any item doesn't have a price property
const total = calculateTotal(null);
\`\`\`

With TypeScript, you can define the expected types:

\`\`\`typescript
interface Item {
  price: number;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

// This will cause a compilation error, preventing a runtime error
const total = calculateTotal(null); // Error: Argument of type 'null' is not assignable to parameter of type 'Item[]'
\`\`\`

### 2. Better IDE Support

TypeScript provides excellent tooling support, including autocompletion, navigation, and refactoring capabilities in modern IDEs like Visual Studio Code. This can significantly improve developer productivity.

### 3. Self-Documenting Code

Type annotations serve as documentation, making it easier for other developers (or your future self) to understand how your code works. This is especially valuable in large codebases or when working in teams.

\`\`\`typescript
// Without TypeScript
function processUser(user) {
  // What properties should user have? It's not clear without looking at the implementation
}

// With TypeScript
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function processUser(user: User): void {
  // The function signature clearly communicates what's expected
}
\`\`\`

### 4. Safer Refactoring

When you need to refactor your code, TypeScript helps ensure that you don't break existing functionality. The compiler will catch type-related issues that might arise from your changes.

### 5. Enhanced Code Navigation

TypeScript makes it easier to navigate through your codebase. You can quickly find all references to a particular function, variable, or class, and jump to their definitions with confidence.

## Getting Started with TypeScript

### Setting Up a TypeScript Project

To start using TypeScript, you'll need to install it and set up a basic configuration:

\`\`\`bash
# Install TypeScript
npm install -g typescript

# Create a new TypeScript project
mkdir my-ts-project
cd my-ts-project
npm init -y
tsc --init
\`\`\`

The \`tsconfig.json\` file created by \`tsc --init\` contains configuration options for the TypeScript compiler. You can customize these options based on your project's needs.

### Basic Type Annotations

TypeScript supports a variety of types, including:

- Primitive types: \`string\`, \`number\`, \`boolean\`
- Arrays: \`string[]\`, \`Array<number>\`
- Objects: \`{ name: string, age: number }\`
- Function types: \`(x: number, y: number) => number\`
- Union types: \`string | null\`
- Generic types: \`Array<T>\`, \`Promise<T>\`

Here's an example of using these types:

\`\`\`typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Objects
let user: { id: number, name: string } = { id: 1, name: "John" };

// Function types
let add: (x: number, y: number) => number = (x, y) => x + y;

// Union types
let result: string | null = null;

// Generic types
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

### Interfaces and Type Aliases

Interfaces and type aliases allow you to define custom types that can be reused throughout your codebase:

\`\`\`typescript
// Interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Type alias
type Point = {
  x: number;
  y: number;
};

// Using the interface
function getUserName(user: User): string {
  return user.name;
}

// Using the type alias
function calculateDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
\`\`\`

## Advanced TypeScript Features

### Type Inference

TypeScript can often infer types based on the context, reducing the need for explicit type annotations:

\`\`\`typescript
// TypeScript infers that 'name' is a string
let name = "John";

// TypeScript infers the return type as number
function add(x: number, y: number) {
  return x + y;
}
\`\`\`

### Generics

Generics allow you to create reusable components that work with a variety of types:

\`\`\`typescript
function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

// TypeScript infers that 'first' is a number or undefined
const first = getFirstElement([1, 2, 3]);

// TypeScript infers that 'name' is a string or undefined
const name = getFirstElement(["Alice", "Bob", "Charlie"]);
\`\`\`

### Utility Types

TypeScript provides several utility types that help manipulate existing types:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Omit the 'password' field for security
type PublicUser = Omit<User, "password">;

// Make all fields optional
type PartialUser = Partial<User>;

// Make all fields required
type RequiredUser = Required<Partial<User>>;

// Extract only the specified fields
type UserCredentials = Pick<User, "email" | "password">;
\`\`\`

## Integrating TypeScript with Existing Projects

You don't need to convert your entire codebase to TypeScript at once. TypeScript can be gradually adopted by:

1. Adding a \`tsconfig.json\` file to your project
2. Renaming some \`.js\` files to \`.ts\` or \`.tsx\`
3. Adding type annotations incrementally
4. Using the \`allowJs\` option in \`tsconfig.json\` to include JavaScript files in the compilation

## Conclusion

TypeScript is a powerful tool for improving code quality and developer productivity. By catching errors early, providing better tooling support, and making your code more self-documenting, TypeScript can help you build more robust and maintainable applications.

While there is a learning curve, the benefits of TypeScript often outweigh the initial investment, especially for larger projects or teams. As you become more familiar with TypeScript, you'll discover even more ways it can enhance your development workflow.

Whether you're starting a new project or working with an existing codebase, consider giving TypeScript a try. Your future self (and your team) will thank you for it.
    `,
    coverImage: "/images/ts.png",
    date: "2023-10-05",
    readingTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Web Development", "Programming"],
  },
]

export function getRecentArticles(count = 3): Article[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
}

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getRelatedArticles(currentSlug: string, count = 2): Article[] {
  const currentArticle = getArticleBySlug(currentSlug)
  if (!currentArticle) return []

  return [...articles]
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => {
      // Count matching tags
      const aTags = a.tags.filter((tag) => currentArticle.tags.includes(tag)).length
      const bTags = b.tags.filter((tag) => currentArticle.tags.includes(tag)).length
      return bTags - aTags
    })
    .slice(0, count)
}

