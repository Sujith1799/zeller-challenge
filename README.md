# Zeller Computer Store Checkout System

This is a checkout system built for Zeller's computer store, which is designed to be flexible and handle different pricing rules as per the Sales Manager's requirements. The checkout system can scan items in any order.

## Catalogue

The following products are available in the store:

| SKU | Name          | Price     |
| --- | -------------| ---------:|
| ipd | Super iPad   | $549.99   |
| mbp | MacBook Pro  | $1399.99  |
| atv | Apple TV     | $109.50   |
| vga | VGA adapter  | $30.00    |

## Special Deals

The following opening day specials are available:

- 3 for 2 deal on Apple TVs (SKU: atv). If you buy 3 Apple TVs, you will pay the price of 2 only.
- Bulk discount on Super iPads (SKU: ipd). The price will drop to $499.99 each if someone buys more than 4.

## Testing

Jest unit testing has been used for this project

### Unit tests and coverage report

<img width="678" alt="image" src="https://user-images.githubusercontent.com/32943856/236710066-2a1e92b5-f994-4009-8230-9ad5dcb6aa23.png">

## Setup

This project is built using TypeScript and Node.js. To set up the project, follow the instructions below:

1. Clone the repository and navigate to the project directory.
2. Run `npm install` to install all the required dependencies.

## Commands

The following commands are available in this project:

- `npm run build` - Compiles the TypeScript code to JavaScript and outputs it to the `dist` directory.
- `npm run debug` - Runs the TypeScript code using `ts-node-dev` in debug mode with auto-restart enabled.
- `npm start` - Starts the server in production mode.
- `npm test` - Runs the tests using Jest.
- `npm run test:watch` - Runs the tests using Jest in watch mode.
- `npm run test:report` - Runs the tests using Jest and generates a coverage report.

## Author

This project was built by Sujith Shanmugam.
