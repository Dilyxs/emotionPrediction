import asyncio
import asyncpg


class AsyncPostgresHelper:
    """
    An asynchronous helper class for interacting with a PostgreSQL database
    using asyncpg. It uses a connection pool for efficiency and is
    designed to be used as an async context manager.
    """

    def __init__(self, dsn: str = None, **kwargs):
        """
        Initializes the helper.

        You can pass a DSN string or keyword arguments for asyncpg.create_pool
        (e.g., user, password, database, host, port).

        Args:
            dsn (str, optional): A PostgreSQL DSN string (e.g., "postgres://user:pass@host/db").
            **kwargs: Alternatively, connection parameters as keywords.
        """
        if dsn:
            self.dsn = dsn
            self.conn_params = {}
        else:
            self.dsn = None
            self.conn_params = kwargs

        self.pool = None

    async def _connect(self):
        """
        Creates the connection pool.
        """
        if not self.pool:
            try:
                if self.dsn:
                    self.pool = await asyncpg.create_pool(dsn=self.dsn)
                else:
                    self.pool = await asyncpg.create_pool(**self.conn_params)
                print(
                    "Successfully connected to PostgreSQL and created connection pool."
                )
            except Exception as e:
                print(f"Failed to connect to PostgreSQL: {e}")
                raise

    async def _disconnect(self):
        """
        Closes the connection pool.
        """
        if self.pool:
            await self.pool.close()
            self.pool = None
            print("PostgreSQL connection pool closed.")

    async def __aenter__(self):
        """
        Async context manager entry: connects to the database.
        """
        await self._connect()
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """
        Async context manager exit: disconnects from the database.
        """
        await self._disconnect()

    async def fetch(self, query: str, *args):
        """
        Fetches multiple rows from the database.

        Args:
            query (str): The SQL query to execute. Use $1, $2 for parameters.
            *args: The parameters to substitute into the query.

        Returns:
            list[asyncpg.Record]: A list of records.
        """
        if not self.pool:
            raise RuntimeError(
                "Database connection pool is not initialized. Did you use 'async with'?"
            )

        try:
            async with self.pool.acquire() as connection:
                records = await connection.fetch(query, *args)
                return records
        except asyncpg.PostgresError as e:
            print(f"Database 'fetch' error: {e}\nQuery: {query}\nArgs: {args}")
            raise
        except Exception as e:
            print(f"An unexpected error occurred during 'fetch': {e}")
            raise

    async def fetchrow(self, query: str, *args):
        """
        Fetches a single row from the database.

        Args:
            query (str): The SQL query to execute. Use $1, $2 for parameters.
            *args: The parameters to substitute into the query.

        Returns:
            asyncpg.Record | None: A single record or None if no row was found.
        """
        if not self.pool:
            raise RuntimeError(
                "Database connection pool is not initialized. Did you use 'async with'?"
            )

        try:
            async with self.pool.acquire() as connection:
                record = await connection.fetchrow(query, *args)
                return record
        except asyncpg.PostgresError as e:
            print(f"Database 'fetchrow' error: {e}\nQuery: {query}\nArgs: {args}")
            raise
        except Exception as e:
            print(f"An unexpected error occurred during 'fetchrow': {e}")
            raise

    async def execute(self, query: str, *args):
        """
        Executes a query that does not return rows (e.g., INSERT, UPDATE, DELETE).

        Args:
            query (str): The SQL query to execute. Use $1, $2 for parameters.
            *args: The parameters to substitute into the query.

        Returns:
            str: The status string from the database (e.g., "INSERT 0 1").
        """
        if not self.pool:
            raise RuntimeError(
                "Database connection pool is not initialized. Did you use 'async with'?"
            )

        try:
            async with self.pool.acquire() as connection:
                status = await connection.execute(query, *args)
                return status
        except asyncpg.PostgresError as e:
            print(f"Database 'execute' error: {e}\nQuery: {query}\nArgs: {args}")
            raise
        except Exception as e:
            print(f"An unexpected error occurred during 'execute': {e}")
            raise
