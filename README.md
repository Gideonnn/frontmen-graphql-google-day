## Quick start

```
# Run mongo container
docker run -d -p 27017:27017 -v ~/databases/mongo/graphql:/data/db mongo

# Run app
npm run start:dev
```
