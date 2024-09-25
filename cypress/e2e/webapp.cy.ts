describe('E2E Tests', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'MOCK PRODUCT 1',
      price: 10,
      availableAmount: 10,
      img: 'mock-product-1.jpg',
      minOrderAmount: 1
    },
    {
      id: '2',
      name: 'MOCK PRODUCT 2',
      price: 20,
      availableAmount: 5,
      img: 'mock-product-2.jpg',
      minOrderAmount: 1
    }
  ];
  beforeEach(() => {
    cy.intercept('GET', 'https://63c10327716562671870f959.mockapi.io/products', {
      statusCode: 200,
      body: mockProducts
    }).as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts');
  });

  describe('Product Page', () => {
    it('should load the products page and display products', () => {
      const firstProduct = mockProducts[0];
      cy.get('[data-cy="product-item"]')
        .should('have.length', 2)
        .first()
        .within(() => {
          cy.get('img').should('be.visible');
          cy.get('[data-cy="product-name"]').should('contain.text', 'Mock product 1');
          cy.get('[data-cy="product-price"]').should('contain.text', `€${firstProduct.price}`);
          cy.get('[data-cy="product-available-amount"]').should(
            'contain.text',
            `${firstProduct.availableAmount}`
          );
          cy.get('[data-cy="product-min-amount"]').should(
            'contain.text',
            `${firstProduct.minOrderAmount}`
          );
        });
    });
  });

  describe('Add to Cart', () => {
    it('should add a product to the cart', () => {
      const firstProduct = mockProducts[0];
      cy.get('[data-cy="product-item"]')
        .first()
        .within(() => {
          cy.get('[data-cy="number-picker"]').type('2');
          cy.get('[data-cy="action-button"]').contains('Add to cart').click();
        });

      cy.get('[data-cy="cart-link"]').click();

      cy.get('[data-cy="cart-item"]')
        .should('have.length', 1)
        .within(() => {
          cy.get('[data-cy="cart-item-name"]').should('contain.text', 'Mock product 1');
          cy.get('[data-cy="cart-item-price"]').should('contain.text', `€${firstProduct.price}`);
          cy.get('[data-cy="cart-item-amount"]').should('contain.text', '2');
          cy.get('[data-cy="cart-item-total-price"]').should('contain.text', '€20');
        });

      cy.get('[data-cy="cart-total-price"]').should('contain.text', '20');
    });
  });

  describe('Remove from Cart', () => {
    it('should remove a product from the cart', () => {
      cy.get('.product-item')
        .first()
        .within(() => {
          cy.get('[data-cy="number-picker"]').type('2');
          cy.get('[data-cy="action-button"]').contains('Add to cart').click();
        });

      cy.get('[data-cy="cart-link"]').click();

      cy.get('[data-cy="cart-item"]')
        .first()
        .within(() => {
          cy.get('[data-cy="action-button"]').contains('X').click();
        });

      cy.get('[data-cy="cart-item"]').should('have.length', 0);
      cy.get('[data-cy="cart-total-price"]').should('contain.text', '€0');
    });
  });
});
