import { ApolloClient, NormalizedCacheObject, ApolloCache, InMemoryCache } from "@apollo/client";

const apolloClientSingleton = () => {
    return new ApolloClient({
        uri: "http://localhost:3001/graphql",
        cache: new InMemoryCache({
            resultCaching: false
        }), // Utilisation de InMemoryCache pour la structure, mais on le configure pour désactiver le cache
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        },
    });
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof apolloClientSingleton>;
} & typeof global;

const apolloClient = globalThis.prismaGlobal ?? apolloClientSingleton()

export default apolloClient

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = apolloClient