import pg from "pg";
import config from "../config/config.js";

const environment = process.env.NODE_ENV || "development";
const Pool = pg.Pool;
const pgConfig = config[environment];

const pool = new Pool(pgConfig);

export default pool;
