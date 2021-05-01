<h2 align="center">
  Steet Home API
</h2>

<p align="center">
  <a href="https://nodejs.org/en/docs/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" /></a>
  <a href="https://graphql.org/"><img src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
" alt="Express JS" /></a>
</p>

<br />

## About

This is an API built in NestJS, GraphQL and TypeORM to serve resolvers from predefined modules.

The main business rule is about selling properties (single homes, townhouse, and apartments) based on their features.  
- Overview
- Facts about
- Visits
- Other features
- Some images

## Technologies

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [ExpressJS](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [TypeORM](https://typeorm.io/#/)

## Running

Clone the repository:
```bash
# Clone the repository
git clone https://github.com/robertomorel/sweet-home-fullstack-project.git

# Enter in the project
cd ./sweet-home-fullstack-project/api
```

Run the following commands:
```bash
# Install all dependencies
yarn install

# Create sqlite db and run the migrations
yarn typeorm migration:run

# Run the api
yarn start
```

### With [Docker](https://docs.docker.com/)
In the /api folder, run:

```bash
# Running the Dockerfile
docker build -t {name_image} .

# Running the docker image
docker run -d --name {container_name} -p 3333:3333 {name_image}
```

## How to test
### First we must understand the endpoints schemas
```js
"property":
  {
    "overview": {
      "price"
      "beds"
      "baths"
      "neighborhood"
      "address"
      "city"
      "zipcode"
      "available"
    },
    "facts": {
      "type"
      "yearBuilt"
      "heating"
      "parking"
      "lot"
      "stories"
    },
    "others": {
      "anualTax"
      "hasGarage"
      "pool"
      "virtualTourLink"
      "parcelNumber"
      "lastSold"
    },
    "visits": {
      "total"
      "lastVisited"
    },
    "homeImage"
    "images"
  },
```

Example: 
```js
"property":
  {
    "overview": {
      "price": "100000.00",
      "beds": 5,
      "baths": 4.5,
      "neighborhood": "Kendall",
      "address": "1234 SW 11th ave",
      "city": "Miami",
      "zipcode": 12345,
      "available": true
    },
    "facts": {
      "type": "Single Home",
      "yearBuilt": 1953,
      "heating": "electric",
      "parking": "2 spaces",
      "lot": "3000 sqft",
      "stories": 2
    },
    "others": {
      "anualTax": 5000.45,
      "hasGarage": true,
      "pool": false,
      "virtualTourLink": "https://vt.test",
      "parcelNumber": 12345678,
      "lastSold": "12-12-2019"
    },
    "visits": {
      "total": 12000,
      "lastVisited": "12-12-2020"
    },
    "homeImage": "./images/property-1.jpg",
    "images": [
      "./images/property-1.jpg",
      "./images/property-detail-1.jpg",
      "./images/property-detail-2.jpg",
      "./images/property-detail-3.jpg",
      "./images/property-detail-4.jpg",
      "./images/property-detail-5.jpg",
      "./images/property-detail-6.jpg",
      "./images/property-detail-7.jpg",
      "./images/property-detail-8.jpg",
      "./images/property-detail-9.jpg",
      "./images/property-detail-10.jpg"
    ]
  }
```

### Using the queries and mutations from GraphQL
First access the link: `http://localhost:3333/graphql`

Then you can run any of these commands in the GraphQL CLI:
- Query
```bash
# Queries
query GetAllFacts {
  getAllFacts {
    id,
    type,
    yearBuilt,
    heating,
    parking,
    lot,
    stories
  }
}

query GetAllOverview {
  getAllOverview {
    id,
    beds,
    baths,
    neighborhood,
    address,
    city,
    zipcode,
    available
  }
}

query GetAllOthers {
  getAllOthers {
    id,
    anualTax,
    hasGarage,
    pool,
    virtualTourLink,
    parcelNumber,
    lastSold
  }
}

query GetAllVisits {
  getAllVisits {
    id,
    total,
    lastVisited
  }
}

query GetProperty {
  getProperty(id: "825b42b6-7772-4adb-9706-66f618af4253") {
    id,
    homeImage,
    images,
    facts {
      id,
      type,
      yearBuilt
    },
    overview {
      id,
      beds,
      baths,
      neighborhood,
      address,
      city,
      zipcode,
      available
    },
    others {
      id,
      anualTax,
      hasGarage,
      pool,
      virtualTourLink,
      parcelNumber,
      lastSold
    },
    visits {
      total,
      lastVisited
    }
  }
}

query GetProperty2 {
  getProperty(where: {
    id: "825b42b6-7772-4adb-9706-66f618af4253"
  }) {
    id,
    homeImage,
    images,
    facts {
      id,
      type,
      yearBuilt
    },
    overview {
      id,
      beds,
      baths,
      neighborhood,
      address,
      city,
      zipcode,
      available
    },
    others {
      id,
      anualTax,
      hasGarage,
      pool,
      virtualTourLink,
      parcelNumber,
      lastSold
    },
    visits {
      total,
      lastVisited
    }
  }
}
```

- Mutation
```bash
# Mutations

mutation CreateFacts {
  createFacts(data: {
    type: "Single Home",
    yearBuilt: 1953,
    heating: "electric",
    parking: "2 spaces",
    lot: "3000 sqft",
    stories: 3
  }) {
    id,
    type,
    yearBuilt,
    heating,
    parking,
    lot,
    stories
  }
}

mutation CreateOverview {
  createOverview(data: {
    price: 1000.00,
    beds: 5,
    baths: 4.5,
    neighborhood: "Kendall",
    address: "1234 SW 11th ave",
    city: "Miami",
    zipcode: 12345,
    available: "T"
  }) {
    id,
    beds,
    baths,
    neighborhood,
    address,
    city,
    zipcode,
    available
  }
}

mutation CreateOthers {
  createOthers(data: {
  	anualTax: 5000.45,
    hasGarage: "T",
    pool: "F",
    virtualTourLink: "https://vt.test",
    parcelNumber: 12345678,
    lastSold: "1992-10-09T00:00:00Z",
  }) {
    id
  }
}

mutation CreateVisits {
  createVisits(data: {
    total: 12000,
    lastVisited: "1992-10-09T00:00:00Z",
  }) {
    id
  }
}

mutation CreateProperty {
  createProperty(data: {
    homeImage: "./images/property-1.jpg",
    images: "./images/property-1.jpg;./images/property-detail-1.jpg",
    factsId: "00560292-1f15-4493-8dd3-c4dd8917012f",
    overviewId: "54c9f6fa-be8c-426e-916a-4450388667c4",
    othersId: "46d1f09b-fd3a-41f4-bf6e-e30ee356cf40",
    visitsId: "c6c2e983-c436-4d84-bfcd-3b00bbd3ec85"
  }) {
    id
  }
}
```
----------------------

## Vamos Conversar?!
- [LinkedIn](https://www.linkedin.com/in/roberto-morel-6b9065193/)