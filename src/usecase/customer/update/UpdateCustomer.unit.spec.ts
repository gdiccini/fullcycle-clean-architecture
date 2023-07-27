import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 123, 'Zip', 'City'));

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    city: 'City Updated',
    number: 1234,
    zip: 'Zip Updated',
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe('unit test for customer update usecase', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
