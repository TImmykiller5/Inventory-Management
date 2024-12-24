const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection string
const uri =
  "mongodb+srv://olawaleolajide8to:timi2002@cluster0.dr4bbl1.mongodb.net";

async function updateProducts() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection
    const database = client.db("inventory");
    const products = database.collection("Product");

    // Update documents missing the "salePrice" field
    const result = await products.updateMany(
      { salePrice: { $exists: false } }, // Filter for documents without "salePrice"
      { $set: { salePrice: 0 } } // Set "salePrice" to 0
    );

    console.log(`${result.matchedCount} documents matched the filter.`);
    console.log(`${result.modifiedCount} documents were updated.`);
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// updateProducts();

// async function addProducts() {
//   const client = new MongoClient(uri);

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Specify the database and collection
//     const database = client.db("inventory");
//     const products = database.collection("Product");

//     // Define the products to be inserted
//     const productsToAdd = [
//       { name: "LGP - Layer Grower Pellet", description: "Chicken feed - Layer Grower Pellet", price: 21400, salePrice: 21400, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "LM - Layer Mash", description: "Chicken feed - Layer Mash", price: 19500, salePrice: 19500, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "GM - Grower Mash", description: "Chicken feed - Grower Mash", price: 19200, salePrice: 19200, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "BSC - Broiler Starter Crumbles", description: "Chicken feed - Broiler Starter Crumbles", price: 23500, salePrice: 23500, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "MBSC - Max Broiler Starter Crumbles", description: "Chicken feed - Max Broiler Starter Crumbles", price: 28000, salePrice: 28000, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "MBGP - Max Broiler Grower Pellet", description: "Chicken feed - Max Broiler Grower Pellet", price: 27800, salePrice: 27800, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "MBFP - Max Broiler Finisher Pellet", description: "Chicken feed - Max Broiler Finisher Pellet", price: 27400, salePrice: 27400, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "LP - Laymax Pellet", description: "Chicken feed - Laymax Pellet", price: 19700, salePrice: 19700, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "ELM - Eco Layer Mash", description: "Chicken feed - Eco Layer Mash", price: 19000, salePrice: 19000, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "BC 2mm - Blue Crown 2mm", description: "Fish feed - Blue Crown 2mm", price: 34900, salePrice: 34900, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "BC 3mm - Blue Crown 3mm", description: "Fish feed - Blue Crown 3mm", price: 29800, salePrice: 29800, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "BC 4mm - Blue Crown 4mm", description: "Fish feed - Blue Crown 4mm", price: 28300, salePrice: 28300, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "BC 6mm - Blue Crown 6mm", description: "Fish feed - Blue Crown 6mm", price: 26800, salePrice: 26800, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "Eco 3mm - Eco Float 3mm", description: "Fish feed - Eco Float 3mm", price: 0, salePrice: 0, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "Eco 4mm - Eco Float 4mm", description: "Fish feed - Eco Float 4mm", price: 22200, salePrice: 22200, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "Eco 6mm - Eco Float 6mm", description: "Fish feed - Eco Float 6mm", price: 21900, salePrice: 21900, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
//       { name: "Eco 9mm - Eco Float 9mm", description: "Fish feed - Eco Float 9mm", price: 21700, salePrice: 21700, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" }
//     ];

//     // Insert the products into the collection
//     const result = await products.insertMany(productsToAdd);

//     console.log(`${result.insertedCount} products were added.`);
//   } catch (error) {
//     console.error("Error adding products:", error);
//   } finally {
//     // Close the connection
//     await client.close();
//   }
// }

// addProducts();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createProducts() {
  const products = [
    // {
    //   name: "LGP - Layer Grower Pellet",
    //   description: "Chicken feed - Layer Grower Pellet",
    //   price: 21400,
    //   salePrice: 21400,
    //   stock: 0,
    //   categoryId: "676a4c6a868f0ed093f37918",
    //   ownerId: "66d6192b9f30229ab60a16ab",
    //   storeId: "67692a14b8372806983a85da",
    // },
    { name: "LM - Layer Mash", description: "Chicken feed - Layer Mash", price: 19500, salePrice: 19500, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "GM - Grower Mash", description: "Chicken feed - Grower Mash", price: 19200, salePrice: 19200, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "BSC - Broiler Starter Crumbles", description: "Chicken feed - Broiler Starter Crumbles", price: 23500, salePrice: 23500, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "MBSC - Max Broiler Starter Crumbles", description: "Chicken feed - Max Broiler Starter Crumbles", price: 28000, salePrice: 28000, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "MBGP - Max Broiler Grower Pellet", description: "Chicken feed - Max Broiler Grower Pellet", price: 27800, salePrice: 27800, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "MBFP - Max Broiler Finisher Pellet", description: "Chicken feed - Max Broiler Finisher Pellet", price: 27400, salePrice: 27400, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "LP - Laymax Pellet", description: "Chicken feed - Laymax Pellet", price: 19700, salePrice: 19700, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "ELM - Eco Layer Mash", description: "Chicken feed - Eco Layer Mash", price: 19000, salePrice: 19000, stock: 0, categoryId: "676a4c6a868f0ed093f37918", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "BC 2mm - Blue Crown 2mm", description: "Fish feed - Blue Crown 2mm", price: 34900, salePrice: 34900, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "BC 3mm - Blue Crown 3mm", description: "Fish feed - Blue Crown 3mm", price: 29800, salePrice: 29800, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "BC 4mm - Blue Crown 4mm", description: "Fish feed - Blue Crown 4mm", price: 28300, salePrice: 28300, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "BC 6mm - Blue Crown 6mm", description: "Fish feed - Blue Crown 6mm", price: 26800, salePrice: 26800, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "Eco 3mm - Eco Float 3mm", description: "Fish feed - Eco Float 3mm", price: 0, salePrice: 0, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "Eco 4mm - Eco Float 4mm", description: "Fish feed - Eco Float 4mm", price: 22200, salePrice: 22200, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "Eco 6mm - Eco Float 6mm", description: "Fish feed - Eco Float 6mm", price: 21900, salePrice: 21900, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" },
    { name: "Eco 9mm - Eco Float 9mm", description: "Fish feed - Eco Float 9mm", price: 21700, salePrice: 21700, stock: 0, categoryId: "676a4cee21a78a2c73269dc9", ownerId: "66d6192b9f30229ab60a16ab", storeId:"67692a14b8372806983a85da" }
    // Add more products as needed
  ];

  try {
    for (const product of products) {
      // Find the category, store, and owner based on the given IDs
      const category = await prisma.category.findUnique({
        where: { id: product.categoryId },
      });

      const store = await prisma.store.findUnique({
        where: { id: product.storeId },
      });

      const owner = await prisma.user.findUnique({
        where: { id: product.ownerId },
      });

      if (!category || !store || !owner) {
        console.error("One of the related entities does not exist.");
        return;
      }

      // Create the product with the found relations
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          salePrice: product.salePrice,
          stock: product.stock,
          // categoryId: category.id,
          // ownerId: owner.id,
          // storeId: store.id,
          category: { connect: { id: category.id } },
          store: { connect: { id: store.id } },
          owner: { connect: { id: owner.id } },
          Restocked: null,
        },
      });

      console.log("Product created successfully:", createdProduct);
    }
  } catch (error) {
    console.error("Error creating products:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createProducts();
