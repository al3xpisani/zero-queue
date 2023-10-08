const data = [
    {
        id: 1,
        name: 'Mock Name 1',
        username: 'nameOne',
        email: 'mock@email.com',
        address: {
            street: 'Mock Address ',
            suite: '123',
            city: 'Mock City',
            zipcode: '123456',
            geo: {
                lat: '-37.3159',
                lng: '81.1496'
            }
        },
        phone: '123456789',
        website: 'mock.org',
        company: {
            name: 'Mock-Crona-Company',
            catchPhrase: 'Mock CatchPhrase',
            bs: 'lorem ipsum'
        }
    }
]

export default {
    get: jest.fn((url) => {
        if (url === 'https://www.smartbox.com/users/') {
            return Promise.resolve({
                data,
                status: 200
            })
        } else if (url === 'https://www.smartbox.com/users/1') {
            return Promise.resolve({
                data: data[0],
                status: 200
            })
        } else {
            throw new Error('Mock Error code 404')
        }
    })
}
