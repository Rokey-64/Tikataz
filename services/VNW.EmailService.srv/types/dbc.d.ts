interface RedisNode {
    [key: string]: string
}

interface RedisConfig {
    [key: string ]: RedisNode;
}

interface DatabaseConfig {
    [key: string ]: RedisConfig
}