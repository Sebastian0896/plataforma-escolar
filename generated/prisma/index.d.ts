
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Centro
 * 
 */
export type Centro = $Result.DefaultSelection<Prisma.$CentroPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Materia
 * 
 */
export type Materia = $Result.DefaultSelection<Prisma.$MateriaPayload>
/**
 * Model Competencia
 * 
 */
export type Competencia = $Result.DefaultSelection<Prisma.$CompetenciaPayload>
/**
 * Model Periodo
 * 
 */
export type Periodo = $Result.DefaultSelection<Prisma.$PeriodoPayload>
/**
 * Model Evaluacion
 * 
 */
export type Evaluacion = $Result.DefaultSelection<Prisma.$EvaluacionPayload>
/**
 * Model Suscripcion
 * 
 */
export type Suscripcion = $Result.DefaultSelection<Prisma.$SuscripcionPayload>
/**
 * Model Pago
 * 
 */
export type Pago = $Result.DefaultSelection<Prisma.$PagoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Centros
 * const centros = await prisma.centro.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Centros
   * const centros = await prisma.centro.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.centro`: Exposes CRUD operations for the **Centro** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Centros
    * const centros = await prisma.centro.findMany()
    * ```
    */
  get centro(): Prisma.CentroDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.materia`: Exposes CRUD operations for the **Materia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Materias
    * const materias = await prisma.materia.findMany()
    * ```
    */
  get materia(): Prisma.MateriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.competencia`: Exposes CRUD operations for the **Competencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Competencias
    * const competencias = await prisma.competencia.findMany()
    * ```
    */
  get competencia(): Prisma.CompetenciaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.periodo`: Exposes CRUD operations for the **Periodo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Periodos
    * const periodos = await prisma.periodo.findMany()
    * ```
    */
  get periodo(): Prisma.PeriodoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluacion`: Exposes CRUD operations for the **Evaluacion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Evaluacions
    * const evaluacions = await prisma.evaluacion.findMany()
    * ```
    */
  get evaluacion(): Prisma.EvaluacionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.suscripcion`: Exposes CRUD operations for the **Suscripcion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suscripcions
    * const suscripcions = await prisma.suscripcion.findMany()
    * ```
    */
  get suscripcion(): Prisma.SuscripcionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pago`: Exposes CRUD operations for the **Pago** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pagos
    * const pagos = await prisma.pago.findMany()
    * ```
    */
  get pago(): Prisma.PagoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Centro: 'Centro',
    Usuario: 'Usuario',
    Materia: 'Materia',
    Competencia: 'Competencia',
    Periodo: 'Periodo',
    Evaluacion: 'Evaluacion',
    Suscripcion: 'Suscripcion',
    Pago: 'Pago'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "centro" | "usuario" | "materia" | "competencia" | "periodo" | "evaluacion" | "suscripcion" | "pago"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Centro: {
        payload: Prisma.$CentroPayload<ExtArgs>
        fields: Prisma.CentroFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CentroFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CentroFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>
          }
          findFirst: {
            args: Prisma.CentroFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CentroFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>
          }
          findMany: {
            args: Prisma.CentroFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>[]
          }
          create: {
            args: Prisma.CentroCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>
          }
          createMany: {
            args: Prisma.CentroCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CentroCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>[]
          }
          delete: {
            args: Prisma.CentroDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>
          }
          update: {
            args: Prisma.CentroUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>
          }
          deleteMany: {
            args: Prisma.CentroDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CentroUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CentroUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>[]
          }
          upsert: {
            args: Prisma.CentroUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CentroPayload>
          }
          aggregate: {
            args: Prisma.CentroAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCentro>
          }
          groupBy: {
            args: Prisma.CentroGroupByArgs<ExtArgs>
            result: $Utils.Optional<CentroGroupByOutputType>[]
          }
          count: {
            args: Prisma.CentroCountArgs<ExtArgs>
            result: $Utils.Optional<CentroCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Materia: {
        payload: Prisma.$MateriaPayload<ExtArgs>
        fields: Prisma.MateriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MateriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MateriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>
          }
          findFirst: {
            args: Prisma.MateriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MateriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>
          }
          findMany: {
            args: Prisma.MateriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>[]
          }
          create: {
            args: Prisma.MateriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>
          }
          createMany: {
            args: Prisma.MateriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MateriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>[]
          }
          delete: {
            args: Prisma.MateriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>
          }
          update: {
            args: Prisma.MateriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>
          }
          deleteMany: {
            args: Prisma.MateriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MateriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MateriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>[]
          }
          upsert: {
            args: Prisma.MateriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MateriaPayload>
          }
          aggregate: {
            args: Prisma.MateriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMateria>
          }
          groupBy: {
            args: Prisma.MateriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MateriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MateriaCountArgs<ExtArgs>
            result: $Utils.Optional<MateriaCountAggregateOutputType> | number
          }
        }
      }
      Competencia: {
        payload: Prisma.$CompetenciaPayload<ExtArgs>
        fields: Prisma.CompetenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompetenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompetenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>
          }
          findFirst: {
            args: Prisma.CompetenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompetenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>
          }
          findMany: {
            args: Prisma.CompetenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>[]
          }
          create: {
            args: Prisma.CompetenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>
          }
          createMany: {
            args: Prisma.CompetenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompetenciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>[]
          }
          delete: {
            args: Prisma.CompetenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>
          }
          update: {
            args: Prisma.CompetenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>
          }
          deleteMany: {
            args: Prisma.CompetenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompetenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompetenciaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>[]
          }
          upsert: {
            args: Prisma.CompetenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetenciaPayload>
          }
          aggregate: {
            args: Prisma.CompetenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompetencia>
          }
          groupBy: {
            args: Prisma.CompetenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompetenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompetenciaCountArgs<ExtArgs>
            result: $Utils.Optional<CompetenciaCountAggregateOutputType> | number
          }
        }
      }
      Periodo: {
        payload: Prisma.$PeriodoPayload<ExtArgs>
        fields: Prisma.PeriodoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PeriodoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PeriodoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>
          }
          findFirst: {
            args: Prisma.PeriodoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PeriodoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>
          }
          findMany: {
            args: Prisma.PeriodoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>[]
          }
          create: {
            args: Prisma.PeriodoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>
          }
          createMany: {
            args: Prisma.PeriodoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PeriodoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>[]
          }
          delete: {
            args: Prisma.PeriodoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>
          }
          update: {
            args: Prisma.PeriodoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>
          }
          deleteMany: {
            args: Prisma.PeriodoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PeriodoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PeriodoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>[]
          }
          upsert: {
            args: Prisma.PeriodoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PeriodoPayload>
          }
          aggregate: {
            args: Prisma.PeriodoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeriodo>
          }
          groupBy: {
            args: Prisma.PeriodoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PeriodoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PeriodoCountArgs<ExtArgs>
            result: $Utils.Optional<PeriodoCountAggregateOutputType> | number
          }
        }
      }
      Evaluacion: {
        payload: Prisma.$EvaluacionPayload<ExtArgs>
        fields: Prisma.EvaluacionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluacionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluacionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>
          }
          findFirst: {
            args: Prisma.EvaluacionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluacionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>
          }
          findMany: {
            args: Prisma.EvaluacionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>[]
          }
          create: {
            args: Prisma.EvaluacionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>
          }
          createMany: {
            args: Prisma.EvaluacionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvaluacionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>[]
          }
          delete: {
            args: Prisma.EvaluacionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>
          }
          update: {
            args: Prisma.EvaluacionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>
          }
          deleteMany: {
            args: Prisma.EvaluacionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluacionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EvaluacionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>[]
          }
          upsert: {
            args: Prisma.EvaluacionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluacionPayload>
          }
          aggregate: {
            args: Prisma.EvaluacionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluacion>
          }
          groupBy: {
            args: Prisma.EvaluacionGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluacionGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluacionCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluacionCountAggregateOutputType> | number
          }
        }
      }
      Suscripcion: {
        payload: Prisma.$SuscripcionPayload<ExtArgs>
        fields: Prisma.SuscripcionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuscripcionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuscripcionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>
          }
          findFirst: {
            args: Prisma.SuscripcionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuscripcionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>
          }
          findMany: {
            args: Prisma.SuscripcionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>[]
          }
          create: {
            args: Prisma.SuscripcionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>
          }
          createMany: {
            args: Prisma.SuscripcionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuscripcionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>[]
          }
          delete: {
            args: Prisma.SuscripcionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>
          }
          update: {
            args: Prisma.SuscripcionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>
          }
          deleteMany: {
            args: Prisma.SuscripcionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuscripcionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SuscripcionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>[]
          }
          upsert: {
            args: Prisma.SuscripcionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuscripcionPayload>
          }
          aggregate: {
            args: Prisma.SuscripcionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuscripcion>
          }
          groupBy: {
            args: Prisma.SuscripcionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuscripcionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuscripcionCountArgs<ExtArgs>
            result: $Utils.Optional<SuscripcionCountAggregateOutputType> | number
          }
        }
      }
      Pago: {
        payload: Prisma.$PagoPayload<ExtArgs>
        fields: Prisma.PagoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PagoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PagoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findFirst: {
            args: Prisma.PagoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PagoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          findMany: {
            args: Prisma.PagoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          create: {
            args: Prisma.PagoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          createMany: {
            args: Prisma.PagoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PagoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          delete: {
            args: Prisma.PagoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          update: {
            args: Prisma.PagoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          deleteMany: {
            args: Prisma.PagoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PagoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PagoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>[]
          }
          upsert: {
            args: Prisma.PagoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagoPayload>
          }
          aggregate: {
            args: Prisma.PagoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePago>
          }
          groupBy: {
            args: Prisma.PagoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PagoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PagoCountArgs<ExtArgs>
            result: $Utils.Optional<PagoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    centro?: CentroOmit
    usuario?: UsuarioOmit
    materia?: MateriaOmit
    competencia?: CompetenciaOmit
    periodo?: PeriodoOmit
    evaluacion?: EvaluacionOmit
    suscripcion?: SuscripcionOmit
    pago?: PagoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CentroCountOutputType
   */

  export type CentroCountOutputType = {
    usuarios: number
    periodos: number
  }

  export type CentroCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | CentroCountOutputTypeCountUsuariosArgs
    periodos?: boolean | CentroCountOutputTypeCountPeriodosArgs
  }

  // Custom InputTypes
  /**
   * CentroCountOutputType without action
   */
  export type CentroCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CentroCountOutputType
     */
    select?: CentroCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CentroCountOutputType without action
   */
  export type CentroCountOutputTypeCountUsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
  }

  /**
   * CentroCountOutputType without action
   */
  export type CentroCountOutputTypeCountPeriodosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeriodoWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    evaluacionesEstudiante: number
    evaluacionesDocente: number
    suscripciones: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluacionesEstudiante?: boolean | UsuarioCountOutputTypeCountEvaluacionesEstudianteArgs
    evaluacionesDocente?: boolean | UsuarioCountOutputTypeCountEvaluacionesDocenteArgs
    suscripciones?: boolean | UsuarioCountOutputTypeCountSuscripcionesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountEvaluacionesEstudianteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluacionWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountEvaluacionesDocenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluacionWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountSuscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuscripcionWhereInput
  }


  /**
   * Count Type CompetenciaCountOutputType
   */

  export type CompetenciaCountOutputType = {
    evaluaciones: number
  }

  export type CompetenciaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluaciones?: boolean | CompetenciaCountOutputTypeCountEvaluacionesArgs
  }

  // Custom InputTypes
  /**
   * CompetenciaCountOutputType without action
   */
  export type CompetenciaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetenciaCountOutputType
     */
    select?: CompetenciaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompetenciaCountOutputType without action
   */
  export type CompetenciaCountOutputTypeCountEvaluacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluacionWhereInput
  }


  /**
   * Count Type PeriodoCountOutputType
   */

  export type PeriodoCountOutputType = {
    evaluaciones: number
  }

  export type PeriodoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluaciones?: boolean | PeriodoCountOutputTypeCountEvaluacionesArgs
  }

  // Custom InputTypes
  /**
   * PeriodoCountOutputType without action
   */
  export type PeriodoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeriodoCountOutputType
     */
    select?: PeriodoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PeriodoCountOutputType without action
   */
  export type PeriodoCountOutputTypeCountEvaluacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluacionWhereInput
  }


  /**
   * Count Type SuscripcionCountOutputType
   */

  export type SuscripcionCountOutputType = {
    pagos: number
  }

  export type SuscripcionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pagos?: boolean | SuscripcionCountOutputTypeCountPagosArgs
  }

  // Custom InputTypes
  /**
   * SuscripcionCountOutputType without action
   */
  export type SuscripcionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuscripcionCountOutputType
     */
    select?: SuscripcionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SuscripcionCountOutputType without action
   */
  export type SuscripcionCountOutputTypeCountPagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Centro
   */

  export type AggregateCentro = {
    _count: CentroCountAggregateOutputType | null
    _avg: CentroAvgAggregateOutputType | null
    _sum: CentroSumAggregateOutputType | null
    _min: CentroMinAggregateOutputType | null
    _max: CentroMaxAggregateOutputType | null
  }

  export type CentroAvgAggregateOutputType = {
    maxDocentes: number | null
    maxEstudiantes: number | null
  }

  export type CentroSumAggregateOutputType = {
    maxDocentes: number | null
    maxEstudiantes: number | null
  }

  export type CentroMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    codigo: string | null
    logo: string | null
    plan: string | null
    maxDocentes: number | null
    maxEstudiantes: number | null
    tipo: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CentroMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    codigo: string | null
    logo: string | null
    plan: string | null
    maxDocentes: number | null
    maxEstudiantes: number | null
    tipo: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CentroCountAggregateOutputType = {
    id: number
    nombre: number
    codigo: number
    logo: number
    plan: number
    maxDocentes: number
    maxEstudiantes: number
    tipo: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CentroAvgAggregateInputType = {
    maxDocentes?: true
    maxEstudiantes?: true
  }

  export type CentroSumAggregateInputType = {
    maxDocentes?: true
    maxEstudiantes?: true
  }

  export type CentroMinAggregateInputType = {
    id?: true
    nombre?: true
    codigo?: true
    logo?: true
    plan?: true
    maxDocentes?: true
    maxEstudiantes?: true
    tipo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CentroMaxAggregateInputType = {
    id?: true
    nombre?: true
    codigo?: true
    logo?: true
    plan?: true
    maxDocentes?: true
    maxEstudiantes?: true
    tipo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CentroCountAggregateInputType = {
    id?: true
    nombre?: true
    codigo?: true
    logo?: true
    plan?: true
    maxDocentes?: true
    maxEstudiantes?: true
    tipo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CentroAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Centro to aggregate.
     */
    where?: CentroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Centros to fetch.
     */
    orderBy?: CentroOrderByWithRelationInput | CentroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CentroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Centros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Centros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Centros
    **/
    _count?: true | CentroCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CentroAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CentroSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CentroMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CentroMaxAggregateInputType
  }

  export type GetCentroAggregateType<T extends CentroAggregateArgs> = {
        [P in keyof T & keyof AggregateCentro]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCentro[P]>
      : GetScalarType<T[P], AggregateCentro[P]>
  }




  export type CentroGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CentroWhereInput
    orderBy?: CentroOrderByWithAggregationInput | CentroOrderByWithAggregationInput[]
    by: CentroScalarFieldEnum[] | CentroScalarFieldEnum
    having?: CentroScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CentroCountAggregateInputType | true
    _avg?: CentroAvgAggregateInputType
    _sum?: CentroSumAggregateInputType
    _min?: CentroMinAggregateInputType
    _max?: CentroMaxAggregateInputType
  }

  export type CentroGroupByOutputType = {
    id: string
    nombre: string
    codigo: string
    logo: string | null
    plan: string
    maxDocentes: number
    maxEstudiantes: number
    tipo: string
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: CentroCountAggregateOutputType | null
    _avg: CentroAvgAggregateOutputType | null
    _sum: CentroSumAggregateOutputType | null
    _min: CentroMinAggregateOutputType | null
    _max: CentroMaxAggregateOutputType | null
  }

  type GetCentroGroupByPayload<T extends CentroGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CentroGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CentroGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CentroGroupByOutputType[P]>
            : GetScalarType<T[P], CentroGroupByOutputType[P]>
        }
      >
    >


  export type CentroSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    codigo?: boolean
    logo?: boolean
    plan?: boolean
    maxDocentes?: boolean
    maxEstudiantes?: boolean
    tipo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuarios?: boolean | Centro$usuariosArgs<ExtArgs>
    periodos?: boolean | Centro$periodosArgs<ExtArgs>
    _count?: boolean | CentroCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["centro"]>

  export type CentroSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    codigo?: boolean
    logo?: boolean
    plan?: boolean
    maxDocentes?: boolean
    maxEstudiantes?: boolean
    tipo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["centro"]>

  export type CentroSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    codigo?: boolean
    logo?: boolean
    plan?: boolean
    maxDocentes?: boolean
    maxEstudiantes?: boolean
    tipo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["centro"]>

  export type CentroSelectScalar = {
    id?: boolean
    nombre?: boolean
    codigo?: boolean
    logo?: boolean
    plan?: boolean
    maxDocentes?: boolean
    maxEstudiantes?: boolean
    tipo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CentroOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "codigo" | "logo" | "plan" | "maxDocentes" | "maxEstudiantes" | "tipo" | "activo" | "createdAt" | "updatedAt", ExtArgs["result"]["centro"]>
  export type CentroInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarios?: boolean | Centro$usuariosArgs<ExtArgs>
    periodos?: boolean | Centro$periodosArgs<ExtArgs>
    _count?: boolean | CentroCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CentroIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CentroIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CentroPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Centro"
    objects: {
      usuarios: Prisma.$UsuarioPayload<ExtArgs>[]
      periodos: Prisma.$PeriodoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      codigo: string
      logo: string | null
      plan: string
      maxDocentes: number
      maxEstudiantes: number
      tipo: string
      activo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["centro"]>
    composites: {}
  }

  type CentroGetPayload<S extends boolean | null | undefined | CentroDefaultArgs> = $Result.GetResult<Prisma.$CentroPayload, S>

  type CentroCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CentroFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CentroCountAggregateInputType | true
    }

  export interface CentroDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Centro'], meta: { name: 'Centro' } }
    /**
     * Find zero or one Centro that matches the filter.
     * @param {CentroFindUniqueArgs} args - Arguments to find a Centro
     * @example
     * // Get one Centro
     * const centro = await prisma.centro.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CentroFindUniqueArgs>(args: SelectSubset<T, CentroFindUniqueArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Centro that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CentroFindUniqueOrThrowArgs} args - Arguments to find a Centro
     * @example
     * // Get one Centro
     * const centro = await prisma.centro.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CentroFindUniqueOrThrowArgs>(args: SelectSubset<T, CentroFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Centro that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroFindFirstArgs} args - Arguments to find a Centro
     * @example
     * // Get one Centro
     * const centro = await prisma.centro.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CentroFindFirstArgs>(args?: SelectSubset<T, CentroFindFirstArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Centro that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroFindFirstOrThrowArgs} args - Arguments to find a Centro
     * @example
     * // Get one Centro
     * const centro = await prisma.centro.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CentroFindFirstOrThrowArgs>(args?: SelectSubset<T, CentroFindFirstOrThrowArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Centros that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Centros
     * const centros = await prisma.centro.findMany()
     * 
     * // Get first 10 Centros
     * const centros = await prisma.centro.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const centroWithIdOnly = await prisma.centro.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CentroFindManyArgs>(args?: SelectSubset<T, CentroFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Centro.
     * @param {CentroCreateArgs} args - Arguments to create a Centro.
     * @example
     * // Create one Centro
     * const Centro = await prisma.centro.create({
     *   data: {
     *     // ... data to create a Centro
     *   }
     * })
     * 
     */
    create<T extends CentroCreateArgs>(args: SelectSubset<T, CentroCreateArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Centros.
     * @param {CentroCreateManyArgs} args - Arguments to create many Centros.
     * @example
     * // Create many Centros
     * const centro = await prisma.centro.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CentroCreateManyArgs>(args?: SelectSubset<T, CentroCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Centros and returns the data saved in the database.
     * @param {CentroCreateManyAndReturnArgs} args - Arguments to create many Centros.
     * @example
     * // Create many Centros
     * const centro = await prisma.centro.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Centros and only return the `id`
     * const centroWithIdOnly = await prisma.centro.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CentroCreateManyAndReturnArgs>(args?: SelectSubset<T, CentroCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Centro.
     * @param {CentroDeleteArgs} args - Arguments to delete one Centro.
     * @example
     * // Delete one Centro
     * const Centro = await prisma.centro.delete({
     *   where: {
     *     // ... filter to delete one Centro
     *   }
     * })
     * 
     */
    delete<T extends CentroDeleteArgs>(args: SelectSubset<T, CentroDeleteArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Centro.
     * @param {CentroUpdateArgs} args - Arguments to update one Centro.
     * @example
     * // Update one Centro
     * const centro = await prisma.centro.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CentroUpdateArgs>(args: SelectSubset<T, CentroUpdateArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Centros.
     * @param {CentroDeleteManyArgs} args - Arguments to filter Centros to delete.
     * @example
     * // Delete a few Centros
     * const { count } = await prisma.centro.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CentroDeleteManyArgs>(args?: SelectSubset<T, CentroDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Centros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Centros
     * const centro = await prisma.centro.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CentroUpdateManyArgs>(args: SelectSubset<T, CentroUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Centros and returns the data updated in the database.
     * @param {CentroUpdateManyAndReturnArgs} args - Arguments to update many Centros.
     * @example
     * // Update many Centros
     * const centro = await prisma.centro.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Centros and only return the `id`
     * const centroWithIdOnly = await prisma.centro.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CentroUpdateManyAndReturnArgs>(args: SelectSubset<T, CentroUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Centro.
     * @param {CentroUpsertArgs} args - Arguments to update or create a Centro.
     * @example
     * // Update or create a Centro
     * const centro = await prisma.centro.upsert({
     *   create: {
     *     // ... data to create a Centro
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Centro we want to update
     *   }
     * })
     */
    upsert<T extends CentroUpsertArgs>(args: SelectSubset<T, CentroUpsertArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Centros.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroCountArgs} args - Arguments to filter Centros to count.
     * @example
     * // Count the number of Centros
     * const count = await prisma.centro.count({
     *   where: {
     *     // ... the filter for the Centros we want to count
     *   }
     * })
    **/
    count<T extends CentroCountArgs>(
      args?: Subset<T, CentroCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CentroCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Centro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CentroAggregateArgs>(args: Subset<T, CentroAggregateArgs>): Prisma.PrismaPromise<GetCentroAggregateType<T>>

    /**
     * Group by Centro.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CentroGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CentroGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CentroGroupByArgs['orderBy'] }
        : { orderBy?: CentroGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CentroGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCentroGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Centro model
   */
  readonly fields: CentroFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Centro.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CentroClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarios<T extends Centro$usuariosArgs<ExtArgs> = {}>(args?: Subset<T, Centro$usuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    periodos<T extends Centro$periodosArgs<ExtArgs> = {}>(args?: Subset<T, Centro$periodosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Centro model
   */
  interface CentroFieldRefs {
    readonly id: FieldRef<"Centro", 'String'>
    readonly nombre: FieldRef<"Centro", 'String'>
    readonly codigo: FieldRef<"Centro", 'String'>
    readonly logo: FieldRef<"Centro", 'String'>
    readonly plan: FieldRef<"Centro", 'String'>
    readonly maxDocentes: FieldRef<"Centro", 'Int'>
    readonly maxEstudiantes: FieldRef<"Centro", 'Int'>
    readonly tipo: FieldRef<"Centro", 'String'>
    readonly activo: FieldRef<"Centro", 'Boolean'>
    readonly createdAt: FieldRef<"Centro", 'DateTime'>
    readonly updatedAt: FieldRef<"Centro", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Centro findUnique
   */
  export type CentroFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * Filter, which Centro to fetch.
     */
    where: CentroWhereUniqueInput
  }

  /**
   * Centro findUniqueOrThrow
   */
  export type CentroFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * Filter, which Centro to fetch.
     */
    where: CentroWhereUniqueInput
  }

  /**
   * Centro findFirst
   */
  export type CentroFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * Filter, which Centro to fetch.
     */
    where?: CentroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Centros to fetch.
     */
    orderBy?: CentroOrderByWithRelationInput | CentroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Centros.
     */
    cursor?: CentroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Centros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Centros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Centros.
     */
    distinct?: CentroScalarFieldEnum | CentroScalarFieldEnum[]
  }

  /**
   * Centro findFirstOrThrow
   */
  export type CentroFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * Filter, which Centro to fetch.
     */
    where?: CentroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Centros to fetch.
     */
    orderBy?: CentroOrderByWithRelationInput | CentroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Centros.
     */
    cursor?: CentroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Centros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Centros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Centros.
     */
    distinct?: CentroScalarFieldEnum | CentroScalarFieldEnum[]
  }

  /**
   * Centro findMany
   */
  export type CentroFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * Filter, which Centros to fetch.
     */
    where?: CentroWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Centros to fetch.
     */
    orderBy?: CentroOrderByWithRelationInput | CentroOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Centros.
     */
    cursor?: CentroWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Centros from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Centros.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Centros.
     */
    distinct?: CentroScalarFieldEnum | CentroScalarFieldEnum[]
  }

  /**
   * Centro create
   */
  export type CentroCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * The data needed to create a Centro.
     */
    data: XOR<CentroCreateInput, CentroUncheckedCreateInput>
  }

  /**
   * Centro createMany
   */
  export type CentroCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Centros.
     */
    data: CentroCreateManyInput | CentroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Centro createManyAndReturn
   */
  export type CentroCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * The data used to create many Centros.
     */
    data: CentroCreateManyInput | CentroCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Centro update
   */
  export type CentroUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * The data needed to update a Centro.
     */
    data: XOR<CentroUpdateInput, CentroUncheckedUpdateInput>
    /**
     * Choose, which Centro to update.
     */
    where: CentroWhereUniqueInput
  }

  /**
   * Centro updateMany
   */
  export type CentroUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Centros.
     */
    data: XOR<CentroUpdateManyMutationInput, CentroUncheckedUpdateManyInput>
    /**
     * Filter which Centros to update
     */
    where?: CentroWhereInput
    /**
     * Limit how many Centros to update.
     */
    limit?: number
  }

  /**
   * Centro updateManyAndReturn
   */
  export type CentroUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * The data used to update Centros.
     */
    data: XOR<CentroUpdateManyMutationInput, CentroUncheckedUpdateManyInput>
    /**
     * Filter which Centros to update
     */
    where?: CentroWhereInput
    /**
     * Limit how many Centros to update.
     */
    limit?: number
  }

  /**
   * Centro upsert
   */
  export type CentroUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * The filter to search for the Centro to update in case it exists.
     */
    where: CentroWhereUniqueInput
    /**
     * In case the Centro found by the `where` argument doesn't exist, create a new Centro with this data.
     */
    create: XOR<CentroCreateInput, CentroUncheckedCreateInput>
    /**
     * In case the Centro was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CentroUpdateInput, CentroUncheckedUpdateInput>
  }

  /**
   * Centro delete
   */
  export type CentroDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    /**
     * Filter which Centro to delete.
     */
    where: CentroWhereUniqueInput
  }

  /**
   * Centro deleteMany
   */
  export type CentroDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Centros to delete
     */
    where?: CentroWhereInput
    /**
     * Limit how many Centros to delete.
     */
    limit?: number
  }

  /**
   * Centro.usuarios
   */
  export type Centro$usuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    cursor?: UsuarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Centro.periodos
   */
  export type Centro$periodosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    where?: PeriodoWhereInput
    orderBy?: PeriodoOrderByWithRelationInput | PeriodoOrderByWithRelationInput[]
    cursor?: PeriodoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PeriodoScalarFieldEnum | PeriodoScalarFieldEnum[]
  }

  /**
   * Centro without action
   */
  export type CentroDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    password: string | null
    rol: string | null
    genero: string | null
    grado: string | null
    categoriaDocente: string | null
    rne: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    centroId: string | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    password: string | null
    rol: string | null
    genero: string | null
    grado: string | null
    categoriaDocente: string | null
    rne: string | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    centroId: string | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    password: number
    rol: number
    genero: number
    grado: number
    grados: number
    niveles: number
    ciclos: number
    materias: number
    categoriaDocente: number
    rne: number
    activo: number
    createdAt: number
    updatedAt: number
    centroId: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    rol?: true
    genero?: true
    grado?: true
    categoriaDocente?: true
    rne?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    centroId?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    rol?: true
    genero?: true
    grado?: true
    categoriaDocente?: true
    rne?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    centroId?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    password?: true
    rol?: true
    genero?: true
    grado?: true
    grados?: true
    niveles?: true
    ciclos?: true
    materias?: true
    categoriaDocente?: true
    rne?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    centroId?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nombre: string
    email: string
    password: string
    rol: string
    genero: string | null
    grado: string | null
    grados: string[]
    niveles: string[]
    ciclos: string[]
    materias: string[]
    categoriaDocente: string | null
    rne: string | null
    activo: boolean
    createdAt: Date
    updatedAt: Date
    centroId: string | null
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    genero?: boolean
    grado?: boolean
    grados?: boolean
    niveles?: boolean
    ciclos?: boolean
    materias?: boolean
    categoriaDocente?: boolean
    rne?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    centroId?: boolean
    centro?: boolean | Usuario$centroArgs<ExtArgs>
    evaluacionesEstudiante?: boolean | Usuario$evaluacionesEstudianteArgs<ExtArgs>
    evaluacionesDocente?: boolean | Usuario$evaluacionesDocenteArgs<ExtArgs>
    suscripciones?: boolean | Usuario$suscripcionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    genero?: boolean
    grado?: boolean
    grados?: boolean
    niveles?: boolean
    ciclos?: boolean
    materias?: boolean
    categoriaDocente?: boolean
    rne?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    centroId?: boolean
    centro?: boolean | Usuario$centroArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    genero?: boolean
    grado?: boolean
    grados?: boolean
    niveles?: boolean
    ciclos?: boolean
    materias?: boolean
    categoriaDocente?: boolean
    rne?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    centroId?: boolean
    centro?: boolean | Usuario$centroArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    password?: boolean
    rol?: boolean
    genero?: boolean
    grado?: boolean
    grados?: boolean
    niveles?: boolean
    ciclos?: boolean
    materias?: boolean
    categoriaDocente?: boolean
    rne?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    centroId?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "email" | "password" | "rol" | "genero" | "grado" | "grados" | "niveles" | "ciclos" | "materias" | "categoriaDocente" | "rne" | "activo" | "createdAt" | "updatedAt" | "centroId", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    centro?: boolean | Usuario$centroArgs<ExtArgs>
    evaluacionesEstudiante?: boolean | Usuario$evaluacionesEstudianteArgs<ExtArgs>
    evaluacionesDocente?: boolean | Usuario$evaluacionesDocenteArgs<ExtArgs>
    suscripciones?: boolean | Usuario$suscripcionesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    centro?: boolean | Usuario$centroArgs<ExtArgs>
  }
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    centro?: boolean | Usuario$centroArgs<ExtArgs>
  }

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      centro: Prisma.$CentroPayload<ExtArgs> | null
      evaluacionesEstudiante: Prisma.$EvaluacionPayload<ExtArgs>[]
      evaluacionesDocente: Prisma.$EvaluacionPayload<ExtArgs>[]
      suscripciones: Prisma.$SuscripcionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      email: string
      password: string
      rol: string
      genero: string | null
      grado: string | null
      grados: string[]
      niveles: string[]
      ciclos: string[]
      materias: string[]
      categoriaDocente: string | null
      rne: string | null
      activo: boolean
      createdAt: Date
      updatedAt: Date
      centroId: string | null
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    centro<T extends Usuario$centroArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$centroArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    evaluacionesEstudiante<T extends Usuario$evaluacionesEstudianteArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$evaluacionesEstudianteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluacionesDocente<T extends Usuario$evaluacionesDocenteArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$evaluacionesDocenteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    suscripciones<T extends Usuario$suscripcionesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$suscripcionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly email: FieldRef<"Usuario", 'String'>
    readonly password: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'String'>
    readonly genero: FieldRef<"Usuario", 'String'>
    readonly grado: FieldRef<"Usuario", 'String'>
    readonly grados: FieldRef<"Usuario", 'String[]'>
    readonly niveles: FieldRef<"Usuario", 'String[]'>
    readonly ciclos: FieldRef<"Usuario", 'String[]'>
    readonly materias: FieldRef<"Usuario", 'String[]'>
    readonly categoriaDocente: FieldRef<"Usuario", 'String'>
    readonly rne: FieldRef<"Usuario", 'String'>
    readonly activo: FieldRef<"Usuario", 'Boolean'>
    readonly createdAt: FieldRef<"Usuario", 'DateTime'>
    readonly updatedAt: FieldRef<"Usuario", 'DateTime'>
    readonly centroId: FieldRef<"Usuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.centro
   */
  export type Usuario$centroArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Centro
     */
    select?: CentroSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Centro
     */
    omit?: CentroOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CentroInclude<ExtArgs> | null
    where?: CentroWhereInput
  }

  /**
   * Usuario.evaluacionesEstudiante
   */
  export type Usuario$evaluacionesEstudianteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    where?: EvaluacionWhereInput
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    cursor?: EvaluacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Usuario.evaluacionesDocente
   */
  export type Usuario$evaluacionesDocenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    where?: EvaluacionWhereInput
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    cursor?: EvaluacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Usuario.suscripciones
   */
  export type Usuario$suscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    where?: SuscripcionWhereInput
    orderBy?: SuscripcionOrderByWithRelationInput | SuscripcionOrderByWithRelationInput[]
    cursor?: SuscripcionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SuscripcionScalarFieldEnum | SuscripcionScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Materia
   */

  export type AggregateMateria = {
    _count: MateriaCountAggregateOutputType | null
    _min: MateriaMinAggregateOutputType | null
    _max: MateriaMaxAggregateOutputType | null
  }

  export type MateriaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    slug: string | null
    categoriaDocente: string | null
    activo: boolean | null
    createdAt: Date | null
  }

  export type MateriaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    slug: string | null
    categoriaDocente: string | null
    activo: boolean | null
    createdAt: Date | null
  }

  export type MateriaCountAggregateOutputType = {
    id: number
    nombre: number
    slug: number
    categoriaDocente: number
    activo: number
    createdAt: number
    _all: number
  }


  export type MateriaMinAggregateInputType = {
    id?: true
    nombre?: true
    slug?: true
    categoriaDocente?: true
    activo?: true
    createdAt?: true
  }

  export type MateriaMaxAggregateInputType = {
    id?: true
    nombre?: true
    slug?: true
    categoriaDocente?: true
    activo?: true
    createdAt?: true
  }

  export type MateriaCountAggregateInputType = {
    id?: true
    nombre?: true
    slug?: true
    categoriaDocente?: true
    activo?: true
    createdAt?: true
    _all?: true
  }

  export type MateriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Materia to aggregate.
     */
    where?: MateriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materias to fetch.
     */
    orderBy?: MateriaOrderByWithRelationInput | MateriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MateriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Materias
    **/
    _count?: true | MateriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MateriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MateriaMaxAggregateInputType
  }

  export type GetMateriaAggregateType<T extends MateriaAggregateArgs> = {
        [P in keyof T & keyof AggregateMateria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMateria[P]>
      : GetScalarType<T[P], AggregateMateria[P]>
  }




  export type MateriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MateriaWhereInput
    orderBy?: MateriaOrderByWithAggregationInput | MateriaOrderByWithAggregationInput[]
    by: MateriaScalarFieldEnum[] | MateriaScalarFieldEnum
    having?: MateriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MateriaCountAggregateInputType | true
    _min?: MateriaMinAggregateInputType
    _max?: MateriaMaxAggregateInputType
  }

  export type MateriaGroupByOutputType = {
    id: string
    nombre: string
    slug: string
    categoriaDocente: string
    activo: boolean
    createdAt: Date
    _count: MateriaCountAggregateOutputType | null
    _min: MateriaMinAggregateOutputType | null
    _max: MateriaMaxAggregateOutputType | null
  }

  type GetMateriaGroupByPayload<T extends MateriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MateriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MateriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MateriaGroupByOutputType[P]>
            : GetScalarType<T[P], MateriaGroupByOutputType[P]>
        }
      >
    >


  export type MateriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    slug?: boolean
    categoriaDocente?: boolean
    activo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["materia"]>

  export type MateriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    slug?: boolean
    categoriaDocente?: boolean
    activo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["materia"]>

  export type MateriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    slug?: boolean
    categoriaDocente?: boolean
    activo?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["materia"]>

  export type MateriaSelectScalar = {
    id?: boolean
    nombre?: boolean
    slug?: boolean
    categoriaDocente?: boolean
    activo?: boolean
    createdAt?: boolean
  }

  export type MateriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "slug" | "categoriaDocente" | "activo" | "createdAt", ExtArgs["result"]["materia"]>

  export type $MateriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Materia"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      slug: string
      categoriaDocente: string
      activo: boolean
      createdAt: Date
    }, ExtArgs["result"]["materia"]>
    composites: {}
  }

  type MateriaGetPayload<S extends boolean | null | undefined | MateriaDefaultArgs> = $Result.GetResult<Prisma.$MateriaPayload, S>

  type MateriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MateriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MateriaCountAggregateInputType | true
    }

  export interface MateriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Materia'], meta: { name: 'Materia' } }
    /**
     * Find zero or one Materia that matches the filter.
     * @param {MateriaFindUniqueArgs} args - Arguments to find a Materia
     * @example
     * // Get one Materia
     * const materia = await prisma.materia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MateriaFindUniqueArgs>(args: SelectSubset<T, MateriaFindUniqueArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Materia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MateriaFindUniqueOrThrowArgs} args - Arguments to find a Materia
     * @example
     * // Get one Materia
     * const materia = await prisma.materia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MateriaFindUniqueOrThrowArgs>(args: SelectSubset<T, MateriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Materia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaFindFirstArgs} args - Arguments to find a Materia
     * @example
     * // Get one Materia
     * const materia = await prisma.materia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MateriaFindFirstArgs>(args?: SelectSubset<T, MateriaFindFirstArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Materia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaFindFirstOrThrowArgs} args - Arguments to find a Materia
     * @example
     * // Get one Materia
     * const materia = await prisma.materia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MateriaFindFirstOrThrowArgs>(args?: SelectSubset<T, MateriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Materias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Materias
     * const materias = await prisma.materia.findMany()
     * 
     * // Get first 10 Materias
     * const materias = await prisma.materia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const materiaWithIdOnly = await prisma.materia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MateriaFindManyArgs>(args?: SelectSubset<T, MateriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Materia.
     * @param {MateriaCreateArgs} args - Arguments to create a Materia.
     * @example
     * // Create one Materia
     * const Materia = await prisma.materia.create({
     *   data: {
     *     // ... data to create a Materia
     *   }
     * })
     * 
     */
    create<T extends MateriaCreateArgs>(args: SelectSubset<T, MateriaCreateArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Materias.
     * @param {MateriaCreateManyArgs} args - Arguments to create many Materias.
     * @example
     * // Create many Materias
     * const materia = await prisma.materia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MateriaCreateManyArgs>(args?: SelectSubset<T, MateriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Materias and returns the data saved in the database.
     * @param {MateriaCreateManyAndReturnArgs} args - Arguments to create many Materias.
     * @example
     * // Create many Materias
     * const materia = await prisma.materia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Materias and only return the `id`
     * const materiaWithIdOnly = await prisma.materia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MateriaCreateManyAndReturnArgs>(args?: SelectSubset<T, MateriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Materia.
     * @param {MateriaDeleteArgs} args - Arguments to delete one Materia.
     * @example
     * // Delete one Materia
     * const Materia = await prisma.materia.delete({
     *   where: {
     *     // ... filter to delete one Materia
     *   }
     * })
     * 
     */
    delete<T extends MateriaDeleteArgs>(args: SelectSubset<T, MateriaDeleteArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Materia.
     * @param {MateriaUpdateArgs} args - Arguments to update one Materia.
     * @example
     * // Update one Materia
     * const materia = await prisma.materia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MateriaUpdateArgs>(args: SelectSubset<T, MateriaUpdateArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Materias.
     * @param {MateriaDeleteManyArgs} args - Arguments to filter Materias to delete.
     * @example
     * // Delete a few Materias
     * const { count } = await prisma.materia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MateriaDeleteManyArgs>(args?: SelectSubset<T, MateriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Materias
     * const materia = await prisma.materia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MateriaUpdateManyArgs>(args: SelectSubset<T, MateriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Materias and returns the data updated in the database.
     * @param {MateriaUpdateManyAndReturnArgs} args - Arguments to update many Materias.
     * @example
     * // Update many Materias
     * const materia = await prisma.materia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Materias and only return the `id`
     * const materiaWithIdOnly = await prisma.materia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MateriaUpdateManyAndReturnArgs>(args: SelectSubset<T, MateriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Materia.
     * @param {MateriaUpsertArgs} args - Arguments to update or create a Materia.
     * @example
     * // Update or create a Materia
     * const materia = await prisma.materia.upsert({
     *   create: {
     *     // ... data to create a Materia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Materia we want to update
     *   }
     * })
     */
    upsert<T extends MateriaUpsertArgs>(args: SelectSubset<T, MateriaUpsertArgs<ExtArgs>>): Prisma__MateriaClient<$Result.GetResult<Prisma.$MateriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Materias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaCountArgs} args - Arguments to filter Materias to count.
     * @example
     * // Count the number of Materias
     * const count = await prisma.materia.count({
     *   where: {
     *     // ... the filter for the Materias we want to count
     *   }
     * })
    **/
    count<T extends MateriaCountArgs>(
      args?: Subset<T, MateriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MateriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Materia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MateriaAggregateArgs>(args: Subset<T, MateriaAggregateArgs>): Prisma.PrismaPromise<GetMateriaAggregateType<T>>

    /**
     * Group by Materia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MateriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MateriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MateriaGroupByArgs['orderBy'] }
        : { orderBy?: MateriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MateriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMateriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Materia model
   */
  readonly fields: MateriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Materia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MateriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Materia model
   */
  interface MateriaFieldRefs {
    readonly id: FieldRef<"Materia", 'String'>
    readonly nombre: FieldRef<"Materia", 'String'>
    readonly slug: FieldRef<"Materia", 'String'>
    readonly categoriaDocente: FieldRef<"Materia", 'String'>
    readonly activo: FieldRef<"Materia", 'Boolean'>
    readonly createdAt: FieldRef<"Materia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Materia findUnique
   */
  export type MateriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * Filter, which Materia to fetch.
     */
    where: MateriaWhereUniqueInput
  }

  /**
   * Materia findUniqueOrThrow
   */
  export type MateriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * Filter, which Materia to fetch.
     */
    where: MateriaWhereUniqueInput
  }

  /**
   * Materia findFirst
   */
  export type MateriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * Filter, which Materia to fetch.
     */
    where?: MateriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materias to fetch.
     */
    orderBy?: MateriaOrderByWithRelationInput | MateriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materias.
     */
    cursor?: MateriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materias.
     */
    distinct?: MateriaScalarFieldEnum | MateriaScalarFieldEnum[]
  }

  /**
   * Materia findFirstOrThrow
   */
  export type MateriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * Filter, which Materia to fetch.
     */
    where?: MateriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materias to fetch.
     */
    orderBy?: MateriaOrderByWithRelationInput | MateriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Materias.
     */
    cursor?: MateriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materias.
     */
    distinct?: MateriaScalarFieldEnum | MateriaScalarFieldEnum[]
  }

  /**
   * Materia findMany
   */
  export type MateriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * Filter, which Materias to fetch.
     */
    where?: MateriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Materias to fetch.
     */
    orderBy?: MateriaOrderByWithRelationInput | MateriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Materias.
     */
    cursor?: MateriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Materias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Materias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Materias.
     */
    distinct?: MateriaScalarFieldEnum | MateriaScalarFieldEnum[]
  }

  /**
   * Materia create
   */
  export type MateriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * The data needed to create a Materia.
     */
    data: XOR<MateriaCreateInput, MateriaUncheckedCreateInput>
  }

  /**
   * Materia createMany
   */
  export type MateriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Materias.
     */
    data: MateriaCreateManyInput | MateriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Materia createManyAndReturn
   */
  export type MateriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * The data used to create many Materias.
     */
    data: MateriaCreateManyInput | MateriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Materia update
   */
  export type MateriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * The data needed to update a Materia.
     */
    data: XOR<MateriaUpdateInput, MateriaUncheckedUpdateInput>
    /**
     * Choose, which Materia to update.
     */
    where: MateriaWhereUniqueInput
  }

  /**
   * Materia updateMany
   */
  export type MateriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Materias.
     */
    data: XOR<MateriaUpdateManyMutationInput, MateriaUncheckedUpdateManyInput>
    /**
     * Filter which Materias to update
     */
    where?: MateriaWhereInput
    /**
     * Limit how many Materias to update.
     */
    limit?: number
  }

  /**
   * Materia updateManyAndReturn
   */
  export type MateriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * The data used to update Materias.
     */
    data: XOR<MateriaUpdateManyMutationInput, MateriaUncheckedUpdateManyInput>
    /**
     * Filter which Materias to update
     */
    where?: MateriaWhereInput
    /**
     * Limit how many Materias to update.
     */
    limit?: number
  }

  /**
   * Materia upsert
   */
  export type MateriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * The filter to search for the Materia to update in case it exists.
     */
    where: MateriaWhereUniqueInput
    /**
     * In case the Materia found by the `where` argument doesn't exist, create a new Materia with this data.
     */
    create: XOR<MateriaCreateInput, MateriaUncheckedCreateInput>
    /**
     * In case the Materia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MateriaUpdateInput, MateriaUncheckedUpdateInput>
  }

  /**
   * Materia delete
   */
  export type MateriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
    /**
     * Filter which Materia to delete.
     */
    where: MateriaWhereUniqueInput
  }

  /**
   * Materia deleteMany
   */
  export type MateriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Materias to delete
     */
    where?: MateriaWhereInput
    /**
     * Limit how many Materias to delete.
     */
    limit?: number
  }

  /**
   * Materia without action
   */
  export type MateriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Materia
     */
    select?: MateriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Materia
     */
    omit?: MateriaOmit<ExtArgs> | null
  }


  /**
   * Model Competencia
   */

  export type AggregateCompetencia = {
    _count: CompetenciaCountAggregateOutputType | null
    _avg: CompetenciaAvgAggregateOutputType | null
    _sum: CompetenciaSumAggregateOutputType | null
    _min: CompetenciaMinAggregateOutputType | null
    _max: CompetenciaMaxAggregateOutputType | null
  }

  export type CompetenciaAvgAggregateOutputType = {
    orden: number | null
  }

  export type CompetenciaSumAggregateOutputType = {
    orden: number | null
  }

  export type CompetenciaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    orden: number | null
    createdAt: Date | null
  }

  export type CompetenciaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    orden: number | null
    createdAt: Date | null
  }

  export type CompetenciaCountAggregateOutputType = {
    id: number
    nombre: number
    orden: number
    createdAt: number
    _all: number
  }


  export type CompetenciaAvgAggregateInputType = {
    orden?: true
  }

  export type CompetenciaSumAggregateInputType = {
    orden?: true
  }

  export type CompetenciaMinAggregateInputType = {
    id?: true
    nombre?: true
    orden?: true
    createdAt?: true
  }

  export type CompetenciaMaxAggregateInputType = {
    id?: true
    nombre?: true
    orden?: true
    createdAt?: true
  }

  export type CompetenciaCountAggregateInputType = {
    id?: true
    nombre?: true
    orden?: true
    createdAt?: true
    _all?: true
  }

  export type CompetenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Competencia to aggregate.
     */
    where?: CompetenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencias to fetch.
     */
    orderBy?: CompetenciaOrderByWithRelationInput | CompetenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompetenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Competencias
    **/
    _count?: true | CompetenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompetenciaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompetenciaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompetenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompetenciaMaxAggregateInputType
  }

  export type GetCompetenciaAggregateType<T extends CompetenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateCompetencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompetencia[P]>
      : GetScalarType<T[P], AggregateCompetencia[P]>
  }




  export type CompetenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompetenciaWhereInput
    orderBy?: CompetenciaOrderByWithAggregationInput | CompetenciaOrderByWithAggregationInput[]
    by: CompetenciaScalarFieldEnum[] | CompetenciaScalarFieldEnum
    having?: CompetenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompetenciaCountAggregateInputType | true
    _avg?: CompetenciaAvgAggregateInputType
    _sum?: CompetenciaSumAggregateInputType
    _min?: CompetenciaMinAggregateInputType
    _max?: CompetenciaMaxAggregateInputType
  }

  export type CompetenciaGroupByOutputType = {
    id: string
    nombre: string
    orden: number
    createdAt: Date
    _count: CompetenciaCountAggregateOutputType | null
    _avg: CompetenciaAvgAggregateOutputType | null
    _sum: CompetenciaSumAggregateOutputType | null
    _min: CompetenciaMinAggregateOutputType | null
    _max: CompetenciaMaxAggregateOutputType | null
  }

  type GetCompetenciaGroupByPayload<T extends CompetenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompetenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompetenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompetenciaGroupByOutputType[P]>
            : GetScalarType<T[P], CompetenciaGroupByOutputType[P]>
        }
      >
    >


  export type CompetenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    orden?: boolean
    createdAt?: boolean
    evaluaciones?: boolean | Competencia$evaluacionesArgs<ExtArgs>
    _count?: boolean | CompetenciaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["competencia"]>

  export type CompetenciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    orden?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["competencia"]>

  export type CompetenciaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    orden?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["competencia"]>

  export type CompetenciaSelectScalar = {
    id?: boolean
    nombre?: boolean
    orden?: boolean
    createdAt?: boolean
  }

  export type CompetenciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "orden" | "createdAt", ExtArgs["result"]["competencia"]>
  export type CompetenciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluaciones?: boolean | Competencia$evaluacionesArgs<ExtArgs>
    _count?: boolean | CompetenciaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompetenciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompetenciaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompetenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Competencia"
    objects: {
      evaluaciones: Prisma.$EvaluacionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      orden: number
      createdAt: Date
    }, ExtArgs["result"]["competencia"]>
    composites: {}
  }

  type CompetenciaGetPayload<S extends boolean | null | undefined | CompetenciaDefaultArgs> = $Result.GetResult<Prisma.$CompetenciaPayload, S>

  type CompetenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompetenciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompetenciaCountAggregateInputType | true
    }

  export interface CompetenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Competencia'], meta: { name: 'Competencia' } }
    /**
     * Find zero or one Competencia that matches the filter.
     * @param {CompetenciaFindUniqueArgs} args - Arguments to find a Competencia
     * @example
     * // Get one Competencia
     * const competencia = await prisma.competencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompetenciaFindUniqueArgs>(args: SelectSubset<T, CompetenciaFindUniqueArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Competencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompetenciaFindUniqueOrThrowArgs} args - Arguments to find a Competencia
     * @example
     * // Get one Competencia
     * const competencia = await prisma.competencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompetenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, CompetenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Competencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaFindFirstArgs} args - Arguments to find a Competencia
     * @example
     * // Get one Competencia
     * const competencia = await prisma.competencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompetenciaFindFirstArgs>(args?: SelectSubset<T, CompetenciaFindFirstArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Competencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaFindFirstOrThrowArgs} args - Arguments to find a Competencia
     * @example
     * // Get one Competencia
     * const competencia = await prisma.competencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompetenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, CompetenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Competencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Competencias
     * const competencias = await prisma.competencia.findMany()
     * 
     * // Get first 10 Competencias
     * const competencias = await prisma.competencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const competenciaWithIdOnly = await prisma.competencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompetenciaFindManyArgs>(args?: SelectSubset<T, CompetenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Competencia.
     * @param {CompetenciaCreateArgs} args - Arguments to create a Competencia.
     * @example
     * // Create one Competencia
     * const Competencia = await prisma.competencia.create({
     *   data: {
     *     // ... data to create a Competencia
     *   }
     * })
     * 
     */
    create<T extends CompetenciaCreateArgs>(args: SelectSubset<T, CompetenciaCreateArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Competencias.
     * @param {CompetenciaCreateManyArgs} args - Arguments to create many Competencias.
     * @example
     * // Create many Competencias
     * const competencia = await prisma.competencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompetenciaCreateManyArgs>(args?: SelectSubset<T, CompetenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Competencias and returns the data saved in the database.
     * @param {CompetenciaCreateManyAndReturnArgs} args - Arguments to create many Competencias.
     * @example
     * // Create many Competencias
     * const competencia = await prisma.competencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Competencias and only return the `id`
     * const competenciaWithIdOnly = await prisma.competencia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompetenciaCreateManyAndReturnArgs>(args?: SelectSubset<T, CompetenciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Competencia.
     * @param {CompetenciaDeleteArgs} args - Arguments to delete one Competencia.
     * @example
     * // Delete one Competencia
     * const Competencia = await prisma.competencia.delete({
     *   where: {
     *     // ... filter to delete one Competencia
     *   }
     * })
     * 
     */
    delete<T extends CompetenciaDeleteArgs>(args: SelectSubset<T, CompetenciaDeleteArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Competencia.
     * @param {CompetenciaUpdateArgs} args - Arguments to update one Competencia.
     * @example
     * // Update one Competencia
     * const competencia = await prisma.competencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompetenciaUpdateArgs>(args: SelectSubset<T, CompetenciaUpdateArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Competencias.
     * @param {CompetenciaDeleteManyArgs} args - Arguments to filter Competencias to delete.
     * @example
     * // Delete a few Competencias
     * const { count } = await prisma.competencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompetenciaDeleteManyArgs>(args?: SelectSubset<T, CompetenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Competencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Competencias
     * const competencia = await prisma.competencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompetenciaUpdateManyArgs>(args: SelectSubset<T, CompetenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Competencias and returns the data updated in the database.
     * @param {CompetenciaUpdateManyAndReturnArgs} args - Arguments to update many Competencias.
     * @example
     * // Update many Competencias
     * const competencia = await prisma.competencia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Competencias and only return the `id`
     * const competenciaWithIdOnly = await prisma.competencia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompetenciaUpdateManyAndReturnArgs>(args: SelectSubset<T, CompetenciaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Competencia.
     * @param {CompetenciaUpsertArgs} args - Arguments to update or create a Competencia.
     * @example
     * // Update or create a Competencia
     * const competencia = await prisma.competencia.upsert({
     *   create: {
     *     // ... data to create a Competencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Competencia we want to update
     *   }
     * })
     */
    upsert<T extends CompetenciaUpsertArgs>(args: SelectSubset<T, CompetenciaUpsertArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Competencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaCountArgs} args - Arguments to filter Competencias to count.
     * @example
     * // Count the number of Competencias
     * const count = await prisma.competencia.count({
     *   where: {
     *     // ... the filter for the Competencias we want to count
     *   }
     * })
    **/
    count<T extends CompetenciaCountArgs>(
      args?: Subset<T, CompetenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompetenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Competencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompetenciaAggregateArgs>(args: Subset<T, CompetenciaAggregateArgs>): Prisma.PrismaPromise<GetCompetenciaAggregateType<T>>

    /**
     * Group by Competencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetenciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompetenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompetenciaGroupByArgs['orderBy'] }
        : { orderBy?: CompetenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompetenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompetenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Competencia model
   */
  readonly fields: CompetenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Competencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompetenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    evaluaciones<T extends Competencia$evaluacionesArgs<ExtArgs> = {}>(args?: Subset<T, Competencia$evaluacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Competencia model
   */
  interface CompetenciaFieldRefs {
    readonly id: FieldRef<"Competencia", 'String'>
    readonly nombre: FieldRef<"Competencia", 'String'>
    readonly orden: FieldRef<"Competencia", 'Int'>
    readonly createdAt: FieldRef<"Competencia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Competencia findUnique
   */
  export type CompetenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * Filter, which Competencia to fetch.
     */
    where: CompetenciaWhereUniqueInput
  }

  /**
   * Competencia findUniqueOrThrow
   */
  export type CompetenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * Filter, which Competencia to fetch.
     */
    where: CompetenciaWhereUniqueInput
  }

  /**
   * Competencia findFirst
   */
  export type CompetenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * Filter, which Competencia to fetch.
     */
    where?: CompetenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencias to fetch.
     */
    orderBy?: CompetenciaOrderByWithRelationInput | CompetenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Competencias.
     */
    cursor?: CompetenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competencias.
     */
    distinct?: CompetenciaScalarFieldEnum | CompetenciaScalarFieldEnum[]
  }

  /**
   * Competencia findFirstOrThrow
   */
  export type CompetenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * Filter, which Competencia to fetch.
     */
    where?: CompetenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencias to fetch.
     */
    orderBy?: CompetenciaOrderByWithRelationInput | CompetenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Competencias.
     */
    cursor?: CompetenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competencias.
     */
    distinct?: CompetenciaScalarFieldEnum | CompetenciaScalarFieldEnum[]
  }

  /**
   * Competencia findMany
   */
  export type CompetenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * Filter, which Competencias to fetch.
     */
    where?: CompetenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Competencias to fetch.
     */
    orderBy?: CompetenciaOrderByWithRelationInput | CompetenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Competencias.
     */
    cursor?: CompetenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Competencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Competencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Competencias.
     */
    distinct?: CompetenciaScalarFieldEnum | CompetenciaScalarFieldEnum[]
  }

  /**
   * Competencia create
   */
  export type CompetenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a Competencia.
     */
    data: XOR<CompetenciaCreateInput, CompetenciaUncheckedCreateInput>
  }

  /**
   * Competencia createMany
   */
  export type CompetenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Competencias.
     */
    data: CompetenciaCreateManyInput | CompetenciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Competencia createManyAndReturn
   */
  export type CompetenciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * The data used to create many Competencias.
     */
    data: CompetenciaCreateManyInput | CompetenciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Competencia update
   */
  export type CompetenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a Competencia.
     */
    data: XOR<CompetenciaUpdateInput, CompetenciaUncheckedUpdateInput>
    /**
     * Choose, which Competencia to update.
     */
    where: CompetenciaWhereUniqueInput
  }

  /**
   * Competencia updateMany
   */
  export type CompetenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Competencias.
     */
    data: XOR<CompetenciaUpdateManyMutationInput, CompetenciaUncheckedUpdateManyInput>
    /**
     * Filter which Competencias to update
     */
    where?: CompetenciaWhereInput
    /**
     * Limit how many Competencias to update.
     */
    limit?: number
  }

  /**
   * Competencia updateManyAndReturn
   */
  export type CompetenciaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * The data used to update Competencias.
     */
    data: XOR<CompetenciaUpdateManyMutationInput, CompetenciaUncheckedUpdateManyInput>
    /**
     * Filter which Competencias to update
     */
    where?: CompetenciaWhereInput
    /**
     * Limit how many Competencias to update.
     */
    limit?: number
  }

  /**
   * Competencia upsert
   */
  export type CompetenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the Competencia to update in case it exists.
     */
    where: CompetenciaWhereUniqueInput
    /**
     * In case the Competencia found by the `where` argument doesn't exist, create a new Competencia with this data.
     */
    create: XOR<CompetenciaCreateInput, CompetenciaUncheckedCreateInput>
    /**
     * In case the Competencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompetenciaUpdateInput, CompetenciaUncheckedUpdateInput>
  }

  /**
   * Competencia delete
   */
  export type CompetenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
    /**
     * Filter which Competencia to delete.
     */
    where: CompetenciaWhereUniqueInput
  }

  /**
   * Competencia deleteMany
   */
  export type CompetenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Competencias to delete
     */
    where?: CompetenciaWhereInput
    /**
     * Limit how many Competencias to delete.
     */
    limit?: number
  }

  /**
   * Competencia.evaluaciones
   */
  export type Competencia$evaluacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    where?: EvaluacionWhereInput
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    cursor?: EvaluacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Competencia without action
   */
  export type CompetenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Competencia
     */
    select?: CompetenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Competencia
     */
    omit?: CompetenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetenciaInclude<ExtArgs> | null
  }


  /**
   * Model Periodo
   */

  export type AggregatePeriodo = {
    _count: PeriodoCountAggregateOutputType | null
    _min: PeriodoMinAggregateOutputType | null
    _max: PeriodoMaxAggregateOutputType | null
  }

  export type PeriodoMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    centroId: string | null
    activo: boolean | null
    createdAt: Date | null
  }

  export type PeriodoMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    centroId: string | null
    activo: boolean | null
    createdAt: Date | null
  }

  export type PeriodoCountAggregateOutputType = {
    id: number
    nombre: number
    fechaInicio: number
    fechaFin: number
    centroId: number
    activo: number
    createdAt: number
    _all: number
  }


  export type PeriodoMinAggregateInputType = {
    id?: true
    nombre?: true
    fechaInicio?: true
    fechaFin?: true
    centroId?: true
    activo?: true
    createdAt?: true
  }

  export type PeriodoMaxAggregateInputType = {
    id?: true
    nombre?: true
    fechaInicio?: true
    fechaFin?: true
    centroId?: true
    activo?: true
    createdAt?: true
  }

  export type PeriodoCountAggregateInputType = {
    id?: true
    nombre?: true
    fechaInicio?: true
    fechaFin?: true
    centroId?: true
    activo?: true
    createdAt?: true
    _all?: true
  }

  export type PeriodoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Periodo to aggregate.
     */
    where?: PeriodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periodos to fetch.
     */
    orderBy?: PeriodoOrderByWithRelationInput | PeriodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PeriodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periodos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periodos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Periodos
    **/
    _count?: true | PeriodoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PeriodoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PeriodoMaxAggregateInputType
  }

  export type GetPeriodoAggregateType<T extends PeriodoAggregateArgs> = {
        [P in keyof T & keyof AggregatePeriodo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeriodo[P]>
      : GetScalarType<T[P], AggregatePeriodo[P]>
  }




  export type PeriodoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PeriodoWhereInput
    orderBy?: PeriodoOrderByWithAggregationInput | PeriodoOrderByWithAggregationInput[]
    by: PeriodoScalarFieldEnum[] | PeriodoScalarFieldEnum
    having?: PeriodoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PeriodoCountAggregateInputType | true
    _min?: PeriodoMinAggregateInputType
    _max?: PeriodoMaxAggregateInputType
  }

  export type PeriodoGroupByOutputType = {
    id: string
    nombre: string
    fechaInicio: Date
    fechaFin: Date
    centroId: string
    activo: boolean
    createdAt: Date
    _count: PeriodoCountAggregateOutputType | null
    _min: PeriodoMinAggregateOutputType | null
    _max: PeriodoMaxAggregateOutputType | null
  }

  type GetPeriodoGroupByPayload<T extends PeriodoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PeriodoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PeriodoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PeriodoGroupByOutputType[P]>
            : GetScalarType<T[P], PeriodoGroupByOutputType[P]>
        }
      >
    >


  export type PeriodoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    centroId?: boolean
    activo?: boolean
    createdAt?: boolean
    centro?: boolean | CentroDefaultArgs<ExtArgs>
    evaluaciones?: boolean | Periodo$evaluacionesArgs<ExtArgs>
    _count?: boolean | PeriodoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["periodo"]>

  export type PeriodoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    centroId?: boolean
    activo?: boolean
    createdAt?: boolean
    centro?: boolean | CentroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["periodo"]>

  export type PeriodoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    centroId?: boolean
    activo?: boolean
    createdAt?: boolean
    centro?: boolean | CentroDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["periodo"]>

  export type PeriodoSelectScalar = {
    id?: boolean
    nombre?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    centroId?: boolean
    activo?: boolean
    createdAt?: boolean
  }

  export type PeriodoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "fechaInicio" | "fechaFin" | "centroId" | "activo" | "createdAt", ExtArgs["result"]["periodo"]>
  export type PeriodoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    centro?: boolean | CentroDefaultArgs<ExtArgs>
    evaluaciones?: boolean | Periodo$evaluacionesArgs<ExtArgs>
    _count?: boolean | PeriodoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PeriodoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    centro?: boolean | CentroDefaultArgs<ExtArgs>
  }
  export type PeriodoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    centro?: boolean | CentroDefaultArgs<ExtArgs>
  }

  export type $PeriodoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Periodo"
    objects: {
      centro: Prisma.$CentroPayload<ExtArgs>
      evaluaciones: Prisma.$EvaluacionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      fechaInicio: Date
      fechaFin: Date
      centroId: string
      activo: boolean
      createdAt: Date
    }, ExtArgs["result"]["periodo"]>
    composites: {}
  }

  type PeriodoGetPayload<S extends boolean | null | undefined | PeriodoDefaultArgs> = $Result.GetResult<Prisma.$PeriodoPayload, S>

  type PeriodoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PeriodoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PeriodoCountAggregateInputType | true
    }

  export interface PeriodoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Periodo'], meta: { name: 'Periodo' } }
    /**
     * Find zero or one Periodo that matches the filter.
     * @param {PeriodoFindUniqueArgs} args - Arguments to find a Periodo
     * @example
     * // Get one Periodo
     * const periodo = await prisma.periodo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeriodoFindUniqueArgs>(args: SelectSubset<T, PeriodoFindUniqueArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Periodo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeriodoFindUniqueOrThrowArgs} args - Arguments to find a Periodo
     * @example
     * // Get one Periodo
     * const periodo = await prisma.periodo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeriodoFindUniqueOrThrowArgs>(args: SelectSubset<T, PeriodoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Periodo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoFindFirstArgs} args - Arguments to find a Periodo
     * @example
     * // Get one Periodo
     * const periodo = await prisma.periodo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeriodoFindFirstArgs>(args?: SelectSubset<T, PeriodoFindFirstArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Periodo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoFindFirstOrThrowArgs} args - Arguments to find a Periodo
     * @example
     * // Get one Periodo
     * const periodo = await prisma.periodo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeriodoFindFirstOrThrowArgs>(args?: SelectSubset<T, PeriodoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Periodos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Periodos
     * const periodos = await prisma.periodo.findMany()
     * 
     * // Get first 10 Periodos
     * const periodos = await prisma.periodo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const periodoWithIdOnly = await prisma.periodo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PeriodoFindManyArgs>(args?: SelectSubset<T, PeriodoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Periodo.
     * @param {PeriodoCreateArgs} args - Arguments to create a Periodo.
     * @example
     * // Create one Periodo
     * const Periodo = await prisma.periodo.create({
     *   data: {
     *     // ... data to create a Periodo
     *   }
     * })
     * 
     */
    create<T extends PeriodoCreateArgs>(args: SelectSubset<T, PeriodoCreateArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Periodos.
     * @param {PeriodoCreateManyArgs} args - Arguments to create many Periodos.
     * @example
     * // Create many Periodos
     * const periodo = await prisma.periodo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PeriodoCreateManyArgs>(args?: SelectSubset<T, PeriodoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Periodos and returns the data saved in the database.
     * @param {PeriodoCreateManyAndReturnArgs} args - Arguments to create many Periodos.
     * @example
     * // Create many Periodos
     * const periodo = await prisma.periodo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Periodos and only return the `id`
     * const periodoWithIdOnly = await prisma.periodo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PeriodoCreateManyAndReturnArgs>(args?: SelectSubset<T, PeriodoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Periodo.
     * @param {PeriodoDeleteArgs} args - Arguments to delete one Periodo.
     * @example
     * // Delete one Periodo
     * const Periodo = await prisma.periodo.delete({
     *   where: {
     *     // ... filter to delete one Periodo
     *   }
     * })
     * 
     */
    delete<T extends PeriodoDeleteArgs>(args: SelectSubset<T, PeriodoDeleteArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Periodo.
     * @param {PeriodoUpdateArgs} args - Arguments to update one Periodo.
     * @example
     * // Update one Periodo
     * const periodo = await prisma.periodo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PeriodoUpdateArgs>(args: SelectSubset<T, PeriodoUpdateArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Periodos.
     * @param {PeriodoDeleteManyArgs} args - Arguments to filter Periodos to delete.
     * @example
     * // Delete a few Periodos
     * const { count } = await prisma.periodo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PeriodoDeleteManyArgs>(args?: SelectSubset<T, PeriodoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Periodos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Periodos
     * const periodo = await prisma.periodo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PeriodoUpdateManyArgs>(args: SelectSubset<T, PeriodoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Periodos and returns the data updated in the database.
     * @param {PeriodoUpdateManyAndReturnArgs} args - Arguments to update many Periodos.
     * @example
     * // Update many Periodos
     * const periodo = await prisma.periodo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Periodos and only return the `id`
     * const periodoWithIdOnly = await prisma.periodo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PeriodoUpdateManyAndReturnArgs>(args: SelectSubset<T, PeriodoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Periodo.
     * @param {PeriodoUpsertArgs} args - Arguments to update or create a Periodo.
     * @example
     * // Update or create a Periodo
     * const periodo = await prisma.periodo.upsert({
     *   create: {
     *     // ... data to create a Periodo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Periodo we want to update
     *   }
     * })
     */
    upsert<T extends PeriodoUpsertArgs>(args: SelectSubset<T, PeriodoUpsertArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Periodos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoCountArgs} args - Arguments to filter Periodos to count.
     * @example
     * // Count the number of Periodos
     * const count = await prisma.periodo.count({
     *   where: {
     *     // ... the filter for the Periodos we want to count
     *   }
     * })
    **/
    count<T extends PeriodoCountArgs>(
      args?: Subset<T, PeriodoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PeriodoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Periodo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PeriodoAggregateArgs>(args: Subset<T, PeriodoAggregateArgs>): Prisma.PrismaPromise<GetPeriodoAggregateType<T>>

    /**
     * Group by Periodo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeriodoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PeriodoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PeriodoGroupByArgs['orderBy'] }
        : { orderBy?: PeriodoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PeriodoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeriodoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Periodo model
   */
  readonly fields: PeriodoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Periodo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PeriodoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    centro<T extends CentroDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CentroDefaultArgs<ExtArgs>>): Prisma__CentroClient<$Result.GetResult<Prisma.$CentroPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evaluaciones<T extends Periodo$evaluacionesArgs<ExtArgs> = {}>(args?: Subset<T, Periodo$evaluacionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Periodo model
   */
  interface PeriodoFieldRefs {
    readonly id: FieldRef<"Periodo", 'String'>
    readonly nombre: FieldRef<"Periodo", 'String'>
    readonly fechaInicio: FieldRef<"Periodo", 'DateTime'>
    readonly fechaFin: FieldRef<"Periodo", 'DateTime'>
    readonly centroId: FieldRef<"Periodo", 'String'>
    readonly activo: FieldRef<"Periodo", 'Boolean'>
    readonly createdAt: FieldRef<"Periodo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Periodo findUnique
   */
  export type PeriodoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * Filter, which Periodo to fetch.
     */
    where: PeriodoWhereUniqueInput
  }

  /**
   * Periodo findUniqueOrThrow
   */
  export type PeriodoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * Filter, which Periodo to fetch.
     */
    where: PeriodoWhereUniqueInput
  }

  /**
   * Periodo findFirst
   */
  export type PeriodoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * Filter, which Periodo to fetch.
     */
    where?: PeriodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periodos to fetch.
     */
    orderBy?: PeriodoOrderByWithRelationInput | PeriodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Periodos.
     */
    cursor?: PeriodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periodos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periodos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periodos.
     */
    distinct?: PeriodoScalarFieldEnum | PeriodoScalarFieldEnum[]
  }

  /**
   * Periodo findFirstOrThrow
   */
  export type PeriodoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * Filter, which Periodo to fetch.
     */
    where?: PeriodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periodos to fetch.
     */
    orderBy?: PeriodoOrderByWithRelationInput | PeriodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Periodos.
     */
    cursor?: PeriodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periodos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periodos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periodos.
     */
    distinct?: PeriodoScalarFieldEnum | PeriodoScalarFieldEnum[]
  }

  /**
   * Periodo findMany
   */
  export type PeriodoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * Filter, which Periodos to fetch.
     */
    where?: PeriodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Periodos to fetch.
     */
    orderBy?: PeriodoOrderByWithRelationInput | PeriodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Periodos.
     */
    cursor?: PeriodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Periodos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Periodos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Periodos.
     */
    distinct?: PeriodoScalarFieldEnum | PeriodoScalarFieldEnum[]
  }

  /**
   * Periodo create
   */
  export type PeriodoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * The data needed to create a Periodo.
     */
    data: XOR<PeriodoCreateInput, PeriodoUncheckedCreateInput>
  }

  /**
   * Periodo createMany
   */
  export type PeriodoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Periodos.
     */
    data: PeriodoCreateManyInput | PeriodoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Periodo createManyAndReturn
   */
  export type PeriodoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * The data used to create many Periodos.
     */
    data: PeriodoCreateManyInput | PeriodoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Periodo update
   */
  export type PeriodoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * The data needed to update a Periodo.
     */
    data: XOR<PeriodoUpdateInput, PeriodoUncheckedUpdateInput>
    /**
     * Choose, which Periodo to update.
     */
    where: PeriodoWhereUniqueInput
  }

  /**
   * Periodo updateMany
   */
  export type PeriodoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Periodos.
     */
    data: XOR<PeriodoUpdateManyMutationInput, PeriodoUncheckedUpdateManyInput>
    /**
     * Filter which Periodos to update
     */
    where?: PeriodoWhereInput
    /**
     * Limit how many Periodos to update.
     */
    limit?: number
  }

  /**
   * Periodo updateManyAndReturn
   */
  export type PeriodoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * The data used to update Periodos.
     */
    data: XOR<PeriodoUpdateManyMutationInput, PeriodoUncheckedUpdateManyInput>
    /**
     * Filter which Periodos to update
     */
    where?: PeriodoWhereInput
    /**
     * Limit how many Periodos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Periodo upsert
   */
  export type PeriodoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * The filter to search for the Periodo to update in case it exists.
     */
    where: PeriodoWhereUniqueInput
    /**
     * In case the Periodo found by the `where` argument doesn't exist, create a new Periodo with this data.
     */
    create: XOR<PeriodoCreateInput, PeriodoUncheckedCreateInput>
    /**
     * In case the Periodo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PeriodoUpdateInput, PeriodoUncheckedUpdateInput>
  }

  /**
   * Periodo delete
   */
  export type PeriodoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
    /**
     * Filter which Periodo to delete.
     */
    where: PeriodoWhereUniqueInput
  }

  /**
   * Periodo deleteMany
   */
  export type PeriodoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Periodos to delete
     */
    where?: PeriodoWhereInput
    /**
     * Limit how many Periodos to delete.
     */
    limit?: number
  }

  /**
   * Periodo.evaluaciones
   */
  export type Periodo$evaluacionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    where?: EvaluacionWhereInput
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    cursor?: EvaluacionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Periodo without action
   */
  export type PeriodoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Periodo
     */
    select?: PeriodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Periodo
     */
    omit?: PeriodoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PeriodoInclude<ExtArgs> | null
  }


  /**
   * Model Evaluacion
   */

  export type AggregateEvaluacion = {
    _count: EvaluacionCountAggregateOutputType | null
    _avg: EvaluacionAvgAggregateOutputType | null
    _sum: EvaluacionSumAggregateOutputType | null
    _min: EvaluacionMinAggregateOutputType | null
    _max: EvaluacionMaxAggregateOutputType | null
  }

  export type EvaluacionAvgAggregateOutputType = {
    nota: number | null
  }

  export type EvaluacionSumAggregateOutputType = {
    nota: number | null
  }

  export type EvaluacionMinAggregateOutputType = {
    id: string | null
    nota: number | null
    materia: string | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
    estudianteId: string | null
    competenciaId: string | null
    periodoId: string | null
    docenteId: string | null
  }

  export type EvaluacionMaxAggregateOutputType = {
    id: string | null
    nota: number | null
    materia: string | null
    observaciones: string | null
    createdAt: Date | null
    updatedAt: Date | null
    estudianteId: string | null
    competenciaId: string | null
    periodoId: string | null
    docenteId: string | null
  }

  export type EvaluacionCountAggregateOutputType = {
    id: number
    nota: number
    materia: number
    observaciones: number
    createdAt: number
    updatedAt: number
    estudianteId: number
    competenciaId: number
    periodoId: number
    docenteId: number
    _all: number
  }


  export type EvaluacionAvgAggregateInputType = {
    nota?: true
  }

  export type EvaluacionSumAggregateInputType = {
    nota?: true
  }

  export type EvaluacionMinAggregateInputType = {
    id?: true
    nota?: true
    materia?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    estudianteId?: true
    competenciaId?: true
    periodoId?: true
    docenteId?: true
  }

  export type EvaluacionMaxAggregateInputType = {
    id?: true
    nota?: true
    materia?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    estudianteId?: true
    competenciaId?: true
    periodoId?: true
    docenteId?: true
  }

  export type EvaluacionCountAggregateInputType = {
    id?: true
    nota?: true
    materia?: true
    observaciones?: true
    createdAt?: true
    updatedAt?: true
    estudianteId?: true
    competenciaId?: true
    periodoId?: true
    docenteId?: true
    _all?: true
  }

  export type EvaluacionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluacion to aggregate.
     */
    where?: EvaluacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluacions to fetch.
     */
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Evaluacions
    **/
    _count?: true | EvaluacionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluacionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluacionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluacionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluacionMaxAggregateInputType
  }

  export type GetEvaluacionAggregateType<T extends EvaluacionAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluacion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluacion[P]>
      : GetScalarType<T[P], AggregateEvaluacion[P]>
  }




  export type EvaluacionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluacionWhereInput
    orderBy?: EvaluacionOrderByWithAggregationInput | EvaluacionOrderByWithAggregationInput[]
    by: EvaluacionScalarFieldEnum[] | EvaluacionScalarFieldEnum
    having?: EvaluacionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluacionCountAggregateInputType | true
    _avg?: EvaluacionAvgAggregateInputType
    _sum?: EvaluacionSumAggregateInputType
    _min?: EvaluacionMinAggregateInputType
    _max?: EvaluacionMaxAggregateInputType
  }

  export type EvaluacionGroupByOutputType = {
    id: string
    nota: number
    materia: string | null
    observaciones: string | null
    createdAt: Date
    updatedAt: Date
    estudianteId: string
    competenciaId: string
    periodoId: string
    docenteId: string
    _count: EvaluacionCountAggregateOutputType | null
    _avg: EvaluacionAvgAggregateOutputType | null
    _sum: EvaluacionSumAggregateOutputType | null
    _min: EvaluacionMinAggregateOutputType | null
    _max: EvaluacionMaxAggregateOutputType | null
  }

  type GetEvaluacionGroupByPayload<T extends EvaluacionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluacionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluacionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluacionGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluacionGroupByOutputType[P]>
        }
      >
    >


  export type EvaluacionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nota?: boolean
    materia?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    estudianteId?: boolean
    competenciaId?: boolean
    periodoId?: boolean
    docenteId?: boolean
    estudiante?: boolean | UsuarioDefaultArgs<ExtArgs>
    competencia?: boolean | CompetenciaDefaultArgs<ExtArgs>
    periodo?: boolean | PeriodoDefaultArgs<ExtArgs>
    docente?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluacion"]>

  export type EvaluacionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nota?: boolean
    materia?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    estudianteId?: boolean
    competenciaId?: boolean
    periodoId?: boolean
    docenteId?: boolean
    estudiante?: boolean | UsuarioDefaultArgs<ExtArgs>
    competencia?: boolean | CompetenciaDefaultArgs<ExtArgs>
    periodo?: boolean | PeriodoDefaultArgs<ExtArgs>
    docente?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluacion"]>

  export type EvaluacionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nota?: boolean
    materia?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    estudianteId?: boolean
    competenciaId?: boolean
    periodoId?: boolean
    docenteId?: boolean
    estudiante?: boolean | UsuarioDefaultArgs<ExtArgs>
    competencia?: boolean | CompetenciaDefaultArgs<ExtArgs>
    periodo?: boolean | PeriodoDefaultArgs<ExtArgs>
    docente?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluacion"]>

  export type EvaluacionSelectScalar = {
    id?: boolean
    nota?: boolean
    materia?: boolean
    observaciones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    estudianteId?: boolean
    competenciaId?: boolean
    periodoId?: boolean
    docenteId?: boolean
  }

  export type EvaluacionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nota" | "materia" | "observaciones" | "createdAt" | "updatedAt" | "estudianteId" | "competenciaId" | "periodoId" | "docenteId", ExtArgs["result"]["evaluacion"]>
  export type EvaluacionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estudiante?: boolean | UsuarioDefaultArgs<ExtArgs>
    competencia?: boolean | CompetenciaDefaultArgs<ExtArgs>
    periodo?: boolean | PeriodoDefaultArgs<ExtArgs>
    docente?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type EvaluacionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estudiante?: boolean | UsuarioDefaultArgs<ExtArgs>
    competencia?: boolean | CompetenciaDefaultArgs<ExtArgs>
    periodo?: boolean | PeriodoDefaultArgs<ExtArgs>
    docente?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type EvaluacionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    estudiante?: boolean | UsuarioDefaultArgs<ExtArgs>
    competencia?: boolean | CompetenciaDefaultArgs<ExtArgs>
    periodo?: boolean | PeriodoDefaultArgs<ExtArgs>
    docente?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $EvaluacionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evaluacion"
    objects: {
      estudiante: Prisma.$UsuarioPayload<ExtArgs>
      competencia: Prisma.$CompetenciaPayload<ExtArgs>
      periodo: Prisma.$PeriodoPayload<ExtArgs>
      docente: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nota: number
      materia: string | null
      observaciones: string | null
      createdAt: Date
      updatedAt: Date
      estudianteId: string
      competenciaId: string
      periodoId: string
      docenteId: string
    }, ExtArgs["result"]["evaluacion"]>
    composites: {}
  }

  type EvaluacionGetPayload<S extends boolean | null | undefined | EvaluacionDefaultArgs> = $Result.GetResult<Prisma.$EvaluacionPayload, S>

  type EvaluacionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluacionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluacionCountAggregateInputType | true
    }

  export interface EvaluacionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evaluacion'], meta: { name: 'Evaluacion' } }
    /**
     * Find zero or one Evaluacion that matches the filter.
     * @param {EvaluacionFindUniqueArgs} args - Arguments to find a Evaluacion
     * @example
     * // Get one Evaluacion
     * const evaluacion = await prisma.evaluacion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluacionFindUniqueArgs>(args: SelectSubset<T, EvaluacionFindUniqueArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Evaluacion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluacionFindUniqueOrThrowArgs} args - Arguments to find a Evaluacion
     * @example
     * // Get one Evaluacion
     * const evaluacion = await prisma.evaluacion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluacionFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluacionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluacion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionFindFirstArgs} args - Arguments to find a Evaluacion
     * @example
     * // Get one Evaluacion
     * const evaluacion = await prisma.evaluacion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluacionFindFirstArgs>(args?: SelectSubset<T, EvaluacionFindFirstArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluacion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionFindFirstOrThrowArgs} args - Arguments to find a Evaluacion
     * @example
     * // Get one Evaluacion
     * const evaluacion = await prisma.evaluacion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluacionFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluacionFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Evaluacions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evaluacions
     * const evaluacions = await prisma.evaluacion.findMany()
     * 
     * // Get first 10 Evaluacions
     * const evaluacions = await prisma.evaluacion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluacionWithIdOnly = await prisma.evaluacion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluacionFindManyArgs>(args?: SelectSubset<T, EvaluacionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Evaluacion.
     * @param {EvaluacionCreateArgs} args - Arguments to create a Evaluacion.
     * @example
     * // Create one Evaluacion
     * const Evaluacion = await prisma.evaluacion.create({
     *   data: {
     *     // ... data to create a Evaluacion
     *   }
     * })
     * 
     */
    create<T extends EvaluacionCreateArgs>(args: SelectSubset<T, EvaluacionCreateArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Evaluacions.
     * @param {EvaluacionCreateManyArgs} args - Arguments to create many Evaluacions.
     * @example
     * // Create many Evaluacions
     * const evaluacion = await prisma.evaluacion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluacionCreateManyArgs>(args?: SelectSubset<T, EvaluacionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Evaluacions and returns the data saved in the database.
     * @param {EvaluacionCreateManyAndReturnArgs} args - Arguments to create many Evaluacions.
     * @example
     * // Create many Evaluacions
     * const evaluacion = await prisma.evaluacion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Evaluacions and only return the `id`
     * const evaluacionWithIdOnly = await prisma.evaluacion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvaluacionCreateManyAndReturnArgs>(args?: SelectSubset<T, EvaluacionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Evaluacion.
     * @param {EvaluacionDeleteArgs} args - Arguments to delete one Evaluacion.
     * @example
     * // Delete one Evaluacion
     * const Evaluacion = await prisma.evaluacion.delete({
     *   where: {
     *     // ... filter to delete one Evaluacion
     *   }
     * })
     * 
     */
    delete<T extends EvaluacionDeleteArgs>(args: SelectSubset<T, EvaluacionDeleteArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Evaluacion.
     * @param {EvaluacionUpdateArgs} args - Arguments to update one Evaluacion.
     * @example
     * // Update one Evaluacion
     * const evaluacion = await prisma.evaluacion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluacionUpdateArgs>(args: SelectSubset<T, EvaluacionUpdateArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Evaluacions.
     * @param {EvaluacionDeleteManyArgs} args - Arguments to filter Evaluacions to delete.
     * @example
     * // Delete a few Evaluacions
     * const { count } = await prisma.evaluacion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluacionDeleteManyArgs>(args?: SelectSubset<T, EvaluacionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evaluacions
     * const evaluacion = await prisma.evaluacion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluacionUpdateManyArgs>(args: SelectSubset<T, EvaluacionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluacions and returns the data updated in the database.
     * @param {EvaluacionUpdateManyAndReturnArgs} args - Arguments to update many Evaluacions.
     * @example
     * // Update many Evaluacions
     * const evaluacion = await prisma.evaluacion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Evaluacions and only return the `id`
     * const evaluacionWithIdOnly = await prisma.evaluacion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EvaluacionUpdateManyAndReturnArgs>(args: SelectSubset<T, EvaluacionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Evaluacion.
     * @param {EvaluacionUpsertArgs} args - Arguments to update or create a Evaluacion.
     * @example
     * // Update or create a Evaluacion
     * const evaluacion = await prisma.evaluacion.upsert({
     *   create: {
     *     // ... data to create a Evaluacion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evaluacion we want to update
     *   }
     * })
     */
    upsert<T extends EvaluacionUpsertArgs>(args: SelectSubset<T, EvaluacionUpsertArgs<ExtArgs>>): Prisma__EvaluacionClient<$Result.GetResult<Prisma.$EvaluacionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Evaluacions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionCountArgs} args - Arguments to filter Evaluacions to count.
     * @example
     * // Count the number of Evaluacions
     * const count = await prisma.evaluacion.count({
     *   where: {
     *     // ... the filter for the Evaluacions we want to count
     *   }
     * })
    **/
    count<T extends EvaluacionCountArgs>(
      args?: Subset<T, EvaluacionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluacionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evaluacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluacionAggregateArgs>(args: Subset<T, EvaluacionAggregateArgs>): Prisma.PrismaPromise<GetEvaluacionAggregateType<T>>

    /**
     * Group by Evaluacion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluacionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluacionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluacionGroupByArgs['orderBy'] }
        : { orderBy?: EvaluacionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluacionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluacionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evaluacion model
   */
  readonly fields: EvaluacionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evaluacion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluacionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    estudiante<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    competencia<T extends CompetenciaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompetenciaDefaultArgs<ExtArgs>>): Prisma__CompetenciaClient<$Result.GetResult<Prisma.$CompetenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    periodo<T extends PeriodoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PeriodoDefaultArgs<ExtArgs>>): Prisma__PeriodoClient<$Result.GetResult<Prisma.$PeriodoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    docente<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Evaluacion model
   */
  interface EvaluacionFieldRefs {
    readonly id: FieldRef<"Evaluacion", 'String'>
    readonly nota: FieldRef<"Evaluacion", 'Float'>
    readonly materia: FieldRef<"Evaluacion", 'String'>
    readonly observaciones: FieldRef<"Evaluacion", 'String'>
    readonly createdAt: FieldRef<"Evaluacion", 'DateTime'>
    readonly updatedAt: FieldRef<"Evaluacion", 'DateTime'>
    readonly estudianteId: FieldRef<"Evaluacion", 'String'>
    readonly competenciaId: FieldRef<"Evaluacion", 'String'>
    readonly periodoId: FieldRef<"Evaluacion", 'String'>
    readonly docenteId: FieldRef<"Evaluacion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Evaluacion findUnique
   */
  export type EvaluacionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * Filter, which Evaluacion to fetch.
     */
    where: EvaluacionWhereUniqueInput
  }

  /**
   * Evaluacion findUniqueOrThrow
   */
  export type EvaluacionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * Filter, which Evaluacion to fetch.
     */
    where: EvaluacionWhereUniqueInput
  }

  /**
   * Evaluacion findFirst
   */
  export type EvaluacionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * Filter, which Evaluacion to fetch.
     */
    where?: EvaluacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluacions to fetch.
     */
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluacions.
     */
    cursor?: EvaluacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluacions.
     */
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Evaluacion findFirstOrThrow
   */
  export type EvaluacionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * Filter, which Evaluacion to fetch.
     */
    where?: EvaluacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluacions to fetch.
     */
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluacions.
     */
    cursor?: EvaluacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluacions.
     */
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Evaluacion findMany
   */
  export type EvaluacionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * Filter, which Evaluacions to fetch.
     */
    where?: EvaluacionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluacions to fetch.
     */
    orderBy?: EvaluacionOrderByWithRelationInput | EvaluacionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Evaluacions.
     */
    cursor?: EvaluacionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluacions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluacions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluacions.
     */
    distinct?: EvaluacionScalarFieldEnum | EvaluacionScalarFieldEnum[]
  }

  /**
   * Evaluacion create
   */
  export type EvaluacionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * The data needed to create a Evaluacion.
     */
    data: XOR<EvaluacionCreateInput, EvaluacionUncheckedCreateInput>
  }

  /**
   * Evaluacion createMany
   */
  export type EvaluacionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Evaluacions.
     */
    data: EvaluacionCreateManyInput | EvaluacionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Evaluacion createManyAndReturn
   */
  export type EvaluacionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * The data used to create many Evaluacions.
     */
    data: EvaluacionCreateManyInput | EvaluacionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Evaluacion update
   */
  export type EvaluacionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * The data needed to update a Evaluacion.
     */
    data: XOR<EvaluacionUpdateInput, EvaluacionUncheckedUpdateInput>
    /**
     * Choose, which Evaluacion to update.
     */
    where: EvaluacionWhereUniqueInput
  }

  /**
   * Evaluacion updateMany
   */
  export type EvaluacionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Evaluacions.
     */
    data: XOR<EvaluacionUpdateManyMutationInput, EvaluacionUncheckedUpdateManyInput>
    /**
     * Filter which Evaluacions to update
     */
    where?: EvaluacionWhereInput
    /**
     * Limit how many Evaluacions to update.
     */
    limit?: number
  }

  /**
   * Evaluacion updateManyAndReturn
   */
  export type EvaluacionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * The data used to update Evaluacions.
     */
    data: XOR<EvaluacionUpdateManyMutationInput, EvaluacionUncheckedUpdateManyInput>
    /**
     * Filter which Evaluacions to update
     */
    where?: EvaluacionWhereInput
    /**
     * Limit how many Evaluacions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Evaluacion upsert
   */
  export type EvaluacionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * The filter to search for the Evaluacion to update in case it exists.
     */
    where: EvaluacionWhereUniqueInput
    /**
     * In case the Evaluacion found by the `where` argument doesn't exist, create a new Evaluacion with this data.
     */
    create: XOR<EvaluacionCreateInput, EvaluacionUncheckedCreateInput>
    /**
     * In case the Evaluacion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluacionUpdateInput, EvaluacionUncheckedUpdateInput>
  }

  /**
   * Evaluacion delete
   */
  export type EvaluacionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
    /**
     * Filter which Evaluacion to delete.
     */
    where: EvaluacionWhereUniqueInput
  }

  /**
   * Evaluacion deleteMany
   */
  export type EvaluacionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluacions to delete
     */
    where?: EvaluacionWhereInput
    /**
     * Limit how many Evaluacions to delete.
     */
    limit?: number
  }

  /**
   * Evaluacion without action
   */
  export type EvaluacionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluacion
     */
    select?: EvaluacionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluacion
     */
    omit?: EvaluacionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluacionInclude<ExtArgs> | null
  }


  /**
   * Model Suscripcion
   */

  export type AggregateSuscripcion = {
    _count: SuscripcionCountAggregateOutputType | null
    _min: SuscripcionMinAggregateOutputType | null
    _max: SuscripcionMaxAggregateOutputType | null
  }

  export type SuscripcionMinAggregateOutputType = {
    id: string | null
    usuarioId: string | null
    plan: string | null
    estado: string | null
    lemonCustomerId: string | null
    lemonSubscriptionId: string | null
    lemonVariantId: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuscripcionMaxAggregateOutputType = {
    id: string | null
    usuarioId: string | null
    plan: string | null
    estado: string | null
    lemonCustomerId: string | null
    lemonSubscriptionId: string | null
    lemonVariantId: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuscripcionCountAggregateOutputType = {
    id: number
    usuarioId: number
    plan: number
    estado: number
    lemonCustomerId: number
    lemonSubscriptionId: number
    lemonVariantId: number
    fechaInicio: number
    fechaFin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SuscripcionMinAggregateInputType = {
    id?: true
    usuarioId?: true
    plan?: true
    estado?: true
    lemonCustomerId?: true
    lemonSubscriptionId?: true
    lemonVariantId?: true
    fechaInicio?: true
    fechaFin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuscripcionMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    plan?: true
    estado?: true
    lemonCustomerId?: true
    lemonSubscriptionId?: true
    lemonVariantId?: true
    fechaInicio?: true
    fechaFin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuscripcionCountAggregateInputType = {
    id?: true
    usuarioId?: true
    plan?: true
    estado?: true
    lemonCustomerId?: true
    lemonSubscriptionId?: true
    lemonVariantId?: true
    fechaInicio?: true
    fechaFin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SuscripcionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suscripcion to aggregate.
     */
    where?: SuscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suscripcions to fetch.
     */
    orderBy?: SuscripcionOrderByWithRelationInput | SuscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suscripcions
    **/
    _count?: true | SuscripcionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuscripcionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuscripcionMaxAggregateInputType
  }

  export type GetSuscripcionAggregateType<T extends SuscripcionAggregateArgs> = {
        [P in keyof T & keyof AggregateSuscripcion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuscripcion[P]>
      : GetScalarType<T[P], AggregateSuscripcion[P]>
  }




  export type SuscripcionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuscripcionWhereInput
    orderBy?: SuscripcionOrderByWithAggregationInput | SuscripcionOrderByWithAggregationInput[]
    by: SuscripcionScalarFieldEnum[] | SuscripcionScalarFieldEnum
    having?: SuscripcionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuscripcionCountAggregateInputType | true
    _min?: SuscripcionMinAggregateInputType
    _max?: SuscripcionMaxAggregateInputType
  }

  export type SuscripcionGroupByOutputType = {
    id: string
    usuarioId: string
    plan: string
    estado: string
    lemonCustomerId: string | null
    lemonSubscriptionId: string | null
    lemonVariantId: string | null
    fechaInicio: Date | null
    fechaFin: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SuscripcionCountAggregateOutputType | null
    _min: SuscripcionMinAggregateOutputType | null
    _max: SuscripcionMaxAggregateOutputType | null
  }

  type GetSuscripcionGroupByPayload<T extends SuscripcionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuscripcionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuscripcionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuscripcionGroupByOutputType[P]>
            : GetScalarType<T[P], SuscripcionGroupByOutputType[P]>
        }
      >
    >


  export type SuscripcionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    plan?: boolean
    estado?: boolean
    lemonCustomerId?: boolean
    lemonSubscriptionId?: boolean
    lemonVariantId?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    pagos?: boolean | Suscripcion$pagosArgs<ExtArgs>
    _count?: boolean | SuscripcionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suscripcion"]>

  export type SuscripcionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    plan?: boolean
    estado?: boolean
    lemonCustomerId?: boolean
    lemonSubscriptionId?: boolean
    lemonVariantId?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suscripcion"]>

  export type SuscripcionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    plan?: boolean
    estado?: boolean
    lemonCustomerId?: boolean
    lemonSubscriptionId?: boolean
    lemonVariantId?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suscripcion"]>

  export type SuscripcionSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    plan?: boolean
    estado?: boolean
    lemonCustomerId?: boolean
    lemonSubscriptionId?: boolean
    lemonVariantId?: boolean
    fechaInicio?: boolean
    fechaFin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SuscripcionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "usuarioId" | "plan" | "estado" | "lemonCustomerId" | "lemonSubscriptionId" | "lemonVariantId" | "fechaInicio" | "fechaFin" | "createdAt" | "updatedAt", ExtArgs["result"]["suscripcion"]>
  export type SuscripcionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
    pagos?: boolean | Suscripcion$pagosArgs<ExtArgs>
    _count?: boolean | SuscripcionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SuscripcionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type SuscripcionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $SuscripcionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Suscripcion"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
      pagos: Prisma.$PagoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      usuarioId: string
      plan: string
      estado: string
      lemonCustomerId: string | null
      lemonSubscriptionId: string | null
      lemonVariantId: string | null
      fechaInicio: Date | null
      fechaFin: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["suscripcion"]>
    composites: {}
  }

  type SuscripcionGetPayload<S extends boolean | null | undefined | SuscripcionDefaultArgs> = $Result.GetResult<Prisma.$SuscripcionPayload, S>

  type SuscripcionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuscripcionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuscripcionCountAggregateInputType | true
    }

  export interface SuscripcionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Suscripcion'], meta: { name: 'Suscripcion' } }
    /**
     * Find zero or one Suscripcion that matches the filter.
     * @param {SuscripcionFindUniqueArgs} args - Arguments to find a Suscripcion
     * @example
     * // Get one Suscripcion
     * const suscripcion = await prisma.suscripcion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuscripcionFindUniqueArgs>(args: SelectSubset<T, SuscripcionFindUniqueArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Suscripcion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuscripcionFindUniqueOrThrowArgs} args - Arguments to find a Suscripcion
     * @example
     * // Get one Suscripcion
     * const suscripcion = await prisma.suscripcion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuscripcionFindUniqueOrThrowArgs>(args: SelectSubset<T, SuscripcionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Suscripcion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionFindFirstArgs} args - Arguments to find a Suscripcion
     * @example
     * // Get one Suscripcion
     * const suscripcion = await prisma.suscripcion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuscripcionFindFirstArgs>(args?: SelectSubset<T, SuscripcionFindFirstArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Suscripcion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionFindFirstOrThrowArgs} args - Arguments to find a Suscripcion
     * @example
     * // Get one Suscripcion
     * const suscripcion = await prisma.suscripcion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuscripcionFindFirstOrThrowArgs>(args?: SelectSubset<T, SuscripcionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suscripcions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suscripcions
     * const suscripcions = await prisma.suscripcion.findMany()
     * 
     * // Get first 10 Suscripcions
     * const suscripcions = await prisma.suscripcion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suscripcionWithIdOnly = await prisma.suscripcion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuscripcionFindManyArgs>(args?: SelectSubset<T, SuscripcionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Suscripcion.
     * @param {SuscripcionCreateArgs} args - Arguments to create a Suscripcion.
     * @example
     * // Create one Suscripcion
     * const Suscripcion = await prisma.suscripcion.create({
     *   data: {
     *     // ... data to create a Suscripcion
     *   }
     * })
     * 
     */
    create<T extends SuscripcionCreateArgs>(args: SelectSubset<T, SuscripcionCreateArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suscripcions.
     * @param {SuscripcionCreateManyArgs} args - Arguments to create many Suscripcions.
     * @example
     * // Create many Suscripcions
     * const suscripcion = await prisma.suscripcion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuscripcionCreateManyArgs>(args?: SelectSubset<T, SuscripcionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suscripcions and returns the data saved in the database.
     * @param {SuscripcionCreateManyAndReturnArgs} args - Arguments to create many Suscripcions.
     * @example
     * // Create many Suscripcions
     * const suscripcion = await prisma.suscripcion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suscripcions and only return the `id`
     * const suscripcionWithIdOnly = await prisma.suscripcion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuscripcionCreateManyAndReturnArgs>(args?: SelectSubset<T, SuscripcionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Suscripcion.
     * @param {SuscripcionDeleteArgs} args - Arguments to delete one Suscripcion.
     * @example
     * // Delete one Suscripcion
     * const Suscripcion = await prisma.suscripcion.delete({
     *   where: {
     *     // ... filter to delete one Suscripcion
     *   }
     * })
     * 
     */
    delete<T extends SuscripcionDeleteArgs>(args: SelectSubset<T, SuscripcionDeleteArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Suscripcion.
     * @param {SuscripcionUpdateArgs} args - Arguments to update one Suscripcion.
     * @example
     * // Update one Suscripcion
     * const suscripcion = await prisma.suscripcion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuscripcionUpdateArgs>(args: SelectSubset<T, SuscripcionUpdateArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suscripcions.
     * @param {SuscripcionDeleteManyArgs} args - Arguments to filter Suscripcions to delete.
     * @example
     * // Delete a few Suscripcions
     * const { count } = await prisma.suscripcion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuscripcionDeleteManyArgs>(args?: SelectSubset<T, SuscripcionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suscripcions
     * const suscripcion = await prisma.suscripcion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuscripcionUpdateManyArgs>(args: SelectSubset<T, SuscripcionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suscripcions and returns the data updated in the database.
     * @param {SuscripcionUpdateManyAndReturnArgs} args - Arguments to update many Suscripcions.
     * @example
     * // Update many Suscripcions
     * const suscripcion = await prisma.suscripcion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Suscripcions and only return the `id`
     * const suscripcionWithIdOnly = await prisma.suscripcion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SuscripcionUpdateManyAndReturnArgs>(args: SelectSubset<T, SuscripcionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Suscripcion.
     * @param {SuscripcionUpsertArgs} args - Arguments to update or create a Suscripcion.
     * @example
     * // Update or create a Suscripcion
     * const suscripcion = await prisma.suscripcion.upsert({
     *   create: {
     *     // ... data to create a Suscripcion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Suscripcion we want to update
     *   }
     * })
     */
    upsert<T extends SuscripcionUpsertArgs>(args: SelectSubset<T, SuscripcionUpsertArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionCountArgs} args - Arguments to filter Suscripcions to count.
     * @example
     * // Count the number of Suscripcions
     * const count = await prisma.suscripcion.count({
     *   where: {
     *     // ... the filter for the Suscripcions we want to count
     *   }
     * })
    **/
    count<T extends SuscripcionCountArgs>(
      args?: Subset<T, SuscripcionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuscripcionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Suscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuscripcionAggregateArgs>(args: Subset<T, SuscripcionAggregateArgs>): Prisma.PrismaPromise<GetSuscripcionAggregateType<T>>

    /**
     * Group by Suscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuscripcionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SuscripcionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuscripcionGroupByArgs['orderBy'] }
        : { orderBy?: SuscripcionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SuscripcionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuscripcionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Suscripcion model
   */
  readonly fields: SuscripcionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Suscripcion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuscripcionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pagos<T extends Suscripcion$pagosArgs<ExtArgs> = {}>(args?: Subset<T, Suscripcion$pagosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Suscripcion model
   */
  interface SuscripcionFieldRefs {
    readonly id: FieldRef<"Suscripcion", 'String'>
    readonly usuarioId: FieldRef<"Suscripcion", 'String'>
    readonly plan: FieldRef<"Suscripcion", 'String'>
    readonly estado: FieldRef<"Suscripcion", 'String'>
    readonly lemonCustomerId: FieldRef<"Suscripcion", 'String'>
    readonly lemonSubscriptionId: FieldRef<"Suscripcion", 'String'>
    readonly lemonVariantId: FieldRef<"Suscripcion", 'String'>
    readonly fechaInicio: FieldRef<"Suscripcion", 'DateTime'>
    readonly fechaFin: FieldRef<"Suscripcion", 'DateTime'>
    readonly createdAt: FieldRef<"Suscripcion", 'DateTime'>
    readonly updatedAt: FieldRef<"Suscripcion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Suscripcion findUnique
   */
  export type SuscripcionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Suscripcion to fetch.
     */
    where: SuscripcionWhereUniqueInput
  }

  /**
   * Suscripcion findUniqueOrThrow
   */
  export type SuscripcionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Suscripcion to fetch.
     */
    where: SuscripcionWhereUniqueInput
  }

  /**
   * Suscripcion findFirst
   */
  export type SuscripcionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Suscripcion to fetch.
     */
    where?: SuscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suscripcions to fetch.
     */
    orderBy?: SuscripcionOrderByWithRelationInput | SuscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suscripcions.
     */
    cursor?: SuscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suscripcions.
     */
    distinct?: SuscripcionScalarFieldEnum | SuscripcionScalarFieldEnum[]
  }

  /**
   * Suscripcion findFirstOrThrow
   */
  export type SuscripcionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Suscripcion to fetch.
     */
    where?: SuscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suscripcions to fetch.
     */
    orderBy?: SuscripcionOrderByWithRelationInput | SuscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suscripcions.
     */
    cursor?: SuscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suscripcions.
     */
    distinct?: SuscripcionScalarFieldEnum | SuscripcionScalarFieldEnum[]
  }

  /**
   * Suscripcion findMany
   */
  export type SuscripcionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Suscripcions to fetch.
     */
    where?: SuscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suscripcions to fetch.
     */
    orderBy?: SuscripcionOrderByWithRelationInput | SuscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suscripcions.
     */
    cursor?: SuscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suscripcions.
     */
    distinct?: SuscripcionScalarFieldEnum | SuscripcionScalarFieldEnum[]
  }

  /**
   * Suscripcion create
   */
  export type SuscripcionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * The data needed to create a Suscripcion.
     */
    data: XOR<SuscripcionCreateInput, SuscripcionUncheckedCreateInput>
  }

  /**
   * Suscripcion createMany
   */
  export type SuscripcionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suscripcions.
     */
    data: SuscripcionCreateManyInput | SuscripcionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Suscripcion createManyAndReturn
   */
  export type SuscripcionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * The data used to create many Suscripcions.
     */
    data: SuscripcionCreateManyInput | SuscripcionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Suscripcion update
   */
  export type SuscripcionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * The data needed to update a Suscripcion.
     */
    data: XOR<SuscripcionUpdateInput, SuscripcionUncheckedUpdateInput>
    /**
     * Choose, which Suscripcion to update.
     */
    where: SuscripcionWhereUniqueInput
  }

  /**
   * Suscripcion updateMany
   */
  export type SuscripcionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suscripcions.
     */
    data: XOR<SuscripcionUpdateManyMutationInput, SuscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Suscripcions to update
     */
    where?: SuscripcionWhereInput
    /**
     * Limit how many Suscripcions to update.
     */
    limit?: number
  }

  /**
   * Suscripcion updateManyAndReturn
   */
  export type SuscripcionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * The data used to update Suscripcions.
     */
    data: XOR<SuscripcionUpdateManyMutationInput, SuscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Suscripcions to update
     */
    where?: SuscripcionWhereInput
    /**
     * Limit how many Suscripcions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Suscripcion upsert
   */
  export type SuscripcionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * The filter to search for the Suscripcion to update in case it exists.
     */
    where: SuscripcionWhereUniqueInput
    /**
     * In case the Suscripcion found by the `where` argument doesn't exist, create a new Suscripcion with this data.
     */
    create: XOR<SuscripcionCreateInput, SuscripcionUncheckedCreateInput>
    /**
     * In case the Suscripcion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuscripcionUpdateInput, SuscripcionUncheckedUpdateInput>
  }

  /**
   * Suscripcion delete
   */
  export type SuscripcionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
    /**
     * Filter which Suscripcion to delete.
     */
    where: SuscripcionWhereUniqueInput
  }

  /**
   * Suscripcion deleteMany
   */
  export type SuscripcionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suscripcions to delete
     */
    where?: SuscripcionWhereInput
    /**
     * Limit how many Suscripcions to delete.
     */
    limit?: number
  }

  /**
   * Suscripcion.pagos
   */
  export type Suscripcion$pagosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    cursor?: PagoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Suscripcion without action
   */
  export type SuscripcionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suscripcion
     */
    select?: SuscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suscripcion
     */
    omit?: SuscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuscripcionInclude<ExtArgs> | null
  }


  /**
   * Model Pago
   */

  export type AggregatePago = {
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  export type PagoAvgAggregateOutputType = {
    monto: number | null
  }

  export type PagoSumAggregateOutputType = {
    monto: number | null
  }

  export type PagoMinAggregateOutputType = {
    id: string | null
    suscripcionId: string | null
    monto: number | null
    moneda: string | null
    estado: string | null
    lemonOrderId: string | null
    lemonPaymentId: string | null
    createdAt: Date | null
  }

  export type PagoMaxAggregateOutputType = {
    id: string | null
    suscripcionId: string | null
    monto: number | null
    moneda: string | null
    estado: string | null
    lemonOrderId: string | null
    lemonPaymentId: string | null
    createdAt: Date | null
  }

  export type PagoCountAggregateOutputType = {
    id: number
    suscripcionId: number
    monto: number
    moneda: number
    estado: number
    lemonOrderId: number
    lemonPaymentId: number
    createdAt: number
    _all: number
  }


  export type PagoAvgAggregateInputType = {
    monto?: true
  }

  export type PagoSumAggregateInputType = {
    monto?: true
  }

  export type PagoMinAggregateInputType = {
    id?: true
    suscripcionId?: true
    monto?: true
    moneda?: true
    estado?: true
    lemonOrderId?: true
    lemonPaymentId?: true
    createdAt?: true
  }

  export type PagoMaxAggregateInputType = {
    id?: true
    suscripcionId?: true
    monto?: true
    moneda?: true
    estado?: true
    lemonOrderId?: true
    lemonPaymentId?: true
    createdAt?: true
  }

  export type PagoCountAggregateInputType = {
    id?: true
    suscripcionId?: true
    monto?: true
    moneda?: true
    estado?: true
    lemonOrderId?: true
    lemonPaymentId?: true
    createdAt?: true
    _all?: true
  }

  export type PagoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pago to aggregate.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pagos
    **/
    _count?: true | PagoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PagoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PagoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PagoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PagoMaxAggregateInputType
  }

  export type GetPagoAggregateType<T extends PagoAggregateArgs> = {
        [P in keyof T & keyof AggregatePago]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePago[P]>
      : GetScalarType<T[P], AggregatePago[P]>
  }




  export type PagoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PagoWhereInput
    orderBy?: PagoOrderByWithAggregationInput | PagoOrderByWithAggregationInput[]
    by: PagoScalarFieldEnum[] | PagoScalarFieldEnum
    having?: PagoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PagoCountAggregateInputType | true
    _avg?: PagoAvgAggregateInputType
    _sum?: PagoSumAggregateInputType
    _min?: PagoMinAggregateInputType
    _max?: PagoMaxAggregateInputType
  }

  export type PagoGroupByOutputType = {
    id: string
    suscripcionId: string
    monto: number
    moneda: string
    estado: string
    lemonOrderId: string | null
    lemonPaymentId: string | null
    createdAt: Date
    _count: PagoCountAggregateOutputType | null
    _avg: PagoAvgAggregateOutputType | null
    _sum: PagoSumAggregateOutputType | null
    _min: PagoMinAggregateOutputType | null
    _max: PagoMaxAggregateOutputType | null
  }

  type GetPagoGroupByPayload<T extends PagoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PagoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PagoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PagoGroupByOutputType[P]>
            : GetScalarType<T[P], PagoGroupByOutputType[P]>
        }
      >
    >


  export type PagoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    suscripcionId?: boolean
    monto?: boolean
    moneda?: boolean
    estado?: boolean
    lemonOrderId?: boolean
    lemonPaymentId?: boolean
    createdAt?: boolean
    suscripcion?: boolean | SuscripcionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    suscripcionId?: boolean
    monto?: boolean
    moneda?: boolean
    estado?: boolean
    lemonOrderId?: boolean
    lemonPaymentId?: boolean
    createdAt?: boolean
    suscripcion?: boolean | SuscripcionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    suscripcionId?: boolean
    monto?: boolean
    moneda?: boolean
    estado?: boolean
    lemonOrderId?: boolean
    lemonPaymentId?: boolean
    createdAt?: boolean
    suscripcion?: boolean | SuscripcionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pago"]>

  export type PagoSelectScalar = {
    id?: boolean
    suscripcionId?: boolean
    monto?: boolean
    moneda?: boolean
    estado?: boolean
    lemonOrderId?: boolean
    lemonPaymentId?: boolean
    createdAt?: boolean
  }

  export type PagoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "suscripcionId" | "monto" | "moneda" | "estado" | "lemonOrderId" | "lemonPaymentId" | "createdAt", ExtArgs["result"]["pago"]>
  export type PagoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    suscripcion?: boolean | SuscripcionDefaultArgs<ExtArgs>
  }
  export type PagoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    suscripcion?: boolean | SuscripcionDefaultArgs<ExtArgs>
  }
  export type PagoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    suscripcion?: boolean | SuscripcionDefaultArgs<ExtArgs>
  }

  export type $PagoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pago"
    objects: {
      suscripcion: Prisma.$SuscripcionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      suscripcionId: string
      monto: number
      moneda: string
      estado: string
      lemonOrderId: string | null
      lemonPaymentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["pago"]>
    composites: {}
  }

  type PagoGetPayload<S extends boolean | null | undefined | PagoDefaultArgs> = $Result.GetResult<Prisma.$PagoPayload, S>

  type PagoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PagoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PagoCountAggregateInputType | true
    }

  export interface PagoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pago'], meta: { name: 'Pago' } }
    /**
     * Find zero or one Pago that matches the filter.
     * @param {PagoFindUniqueArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PagoFindUniqueArgs>(args: SelectSubset<T, PagoFindUniqueArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pago that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PagoFindUniqueOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PagoFindUniqueOrThrowArgs>(args: SelectSubset<T, PagoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PagoFindFirstArgs>(args?: SelectSubset<T, PagoFindFirstArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pago that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindFirstOrThrowArgs} args - Arguments to find a Pago
     * @example
     * // Get one Pago
     * const pago = await prisma.pago.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PagoFindFirstOrThrowArgs>(args?: SelectSubset<T, PagoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pagos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pagos
     * const pagos = await prisma.pago.findMany()
     * 
     * // Get first 10 Pagos
     * const pagos = await prisma.pago.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pagoWithIdOnly = await prisma.pago.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PagoFindManyArgs>(args?: SelectSubset<T, PagoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pago.
     * @param {PagoCreateArgs} args - Arguments to create a Pago.
     * @example
     * // Create one Pago
     * const Pago = await prisma.pago.create({
     *   data: {
     *     // ... data to create a Pago
     *   }
     * })
     * 
     */
    create<T extends PagoCreateArgs>(args: SelectSubset<T, PagoCreateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pagos.
     * @param {PagoCreateManyArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PagoCreateManyArgs>(args?: SelectSubset<T, PagoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pagos and returns the data saved in the database.
     * @param {PagoCreateManyAndReturnArgs} args - Arguments to create many Pagos.
     * @example
     * // Create many Pagos
     * const pago = await prisma.pago.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PagoCreateManyAndReturnArgs>(args?: SelectSubset<T, PagoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pago.
     * @param {PagoDeleteArgs} args - Arguments to delete one Pago.
     * @example
     * // Delete one Pago
     * const Pago = await prisma.pago.delete({
     *   where: {
     *     // ... filter to delete one Pago
     *   }
     * })
     * 
     */
    delete<T extends PagoDeleteArgs>(args: SelectSubset<T, PagoDeleteArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pago.
     * @param {PagoUpdateArgs} args - Arguments to update one Pago.
     * @example
     * // Update one Pago
     * const pago = await prisma.pago.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PagoUpdateArgs>(args: SelectSubset<T, PagoUpdateArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pagos.
     * @param {PagoDeleteManyArgs} args - Arguments to filter Pagos to delete.
     * @example
     * // Delete a few Pagos
     * const { count } = await prisma.pago.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PagoDeleteManyArgs>(args?: SelectSubset<T, PagoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PagoUpdateManyArgs>(args: SelectSubset<T, PagoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pagos and returns the data updated in the database.
     * @param {PagoUpdateManyAndReturnArgs} args - Arguments to update many Pagos.
     * @example
     * // Update many Pagos
     * const pago = await prisma.pago.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pagos and only return the `id`
     * const pagoWithIdOnly = await prisma.pago.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PagoUpdateManyAndReturnArgs>(args: SelectSubset<T, PagoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pago.
     * @param {PagoUpsertArgs} args - Arguments to update or create a Pago.
     * @example
     * // Update or create a Pago
     * const pago = await prisma.pago.upsert({
     *   create: {
     *     // ... data to create a Pago
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pago we want to update
     *   }
     * })
     */
    upsert<T extends PagoUpsertArgs>(args: SelectSubset<T, PagoUpsertArgs<ExtArgs>>): Prisma__PagoClient<$Result.GetResult<Prisma.$PagoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pagos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoCountArgs} args - Arguments to filter Pagos to count.
     * @example
     * // Count the number of Pagos
     * const count = await prisma.pago.count({
     *   where: {
     *     // ... the filter for the Pagos we want to count
     *   }
     * })
    **/
    count<T extends PagoCountArgs>(
      args?: Subset<T, PagoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PagoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PagoAggregateArgs>(args: Subset<T, PagoAggregateArgs>): Prisma.PrismaPromise<GetPagoAggregateType<T>>

    /**
     * Group by Pago.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PagoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PagoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PagoGroupByArgs['orderBy'] }
        : { orderBy?: PagoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PagoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPagoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pago model
   */
  readonly fields: PagoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pago.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PagoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    suscripcion<T extends SuscripcionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SuscripcionDefaultArgs<ExtArgs>>): Prisma__SuscripcionClient<$Result.GetResult<Prisma.$SuscripcionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pago model
   */
  interface PagoFieldRefs {
    readonly id: FieldRef<"Pago", 'String'>
    readonly suscripcionId: FieldRef<"Pago", 'String'>
    readonly monto: FieldRef<"Pago", 'Float'>
    readonly moneda: FieldRef<"Pago", 'String'>
    readonly estado: FieldRef<"Pago", 'String'>
    readonly lemonOrderId: FieldRef<"Pago", 'String'>
    readonly lemonPaymentId: FieldRef<"Pago", 'String'>
    readonly createdAt: FieldRef<"Pago", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pago findUnique
   */
  export type PagoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findUniqueOrThrow
   */
  export type PagoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago findFirst
   */
  export type PagoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findFirstOrThrow
   */
  export type PagoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pago to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago findMany
   */
  export type PagoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter, which Pagos to fetch.
     */
    where?: PagoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pagos to fetch.
     */
    orderBy?: PagoOrderByWithRelationInput | PagoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pagos.
     */
    cursor?: PagoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pagos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pagos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pagos.
     */
    distinct?: PagoScalarFieldEnum | PagoScalarFieldEnum[]
  }

  /**
   * Pago create
   */
  export type PagoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to create a Pago.
     */
    data: XOR<PagoCreateInput, PagoUncheckedCreateInput>
  }

  /**
   * Pago createMany
   */
  export type PagoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pago createManyAndReturn
   */
  export type PagoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * The data used to create many Pagos.
     */
    data: PagoCreateManyInput | PagoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago update
   */
  export type PagoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The data needed to update a Pago.
     */
    data: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
    /**
     * Choose, which Pago to update.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago updateMany
   */
  export type PagoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
  }

  /**
   * Pago updateManyAndReturn
   */
  export type PagoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * The data used to update Pagos.
     */
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyInput>
    /**
     * Filter which Pagos to update
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pago upsert
   */
  export type PagoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * The filter to search for the Pago to update in case it exists.
     */
    where: PagoWhereUniqueInput
    /**
     * In case the Pago found by the `where` argument doesn't exist, create a new Pago with this data.
     */
    create: XOR<PagoCreateInput, PagoUncheckedCreateInput>
    /**
     * In case the Pago was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PagoUpdateInput, PagoUncheckedUpdateInput>
  }

  /**
   * Pago delete
   */
  export type PagoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
    /**
     * Filter which Pago to delete.
     */
    where: PagoWhereUniqueInput
  }

  /**
   * Pago deleteMany
   */
  export type PagoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pagos to delete
     */
    where?: PagoWhereInput
    /**
     * Limit how many Pagos to delete.
     */
    limit?: number
  }

  /**
   * Pago without action
   */
  export type PagoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pago
     */
    select?: PagoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pago
     */
    omit?: PagoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PagoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CentroScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    codigo: 'codigo',
    logo: 'logo',
    plan: 'plan',
    maxDocentes: 'maxDocentes',
    maxEstudiantes: 'maxEstudiantes',
    tipo: 'tipo',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CentroScalarFieldEnum = (typeof CentroScalarFieldEnum)[keyof typeof CentroScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    password: 'password',
    rol: 'rol',
    genero: 'genero',
    grado: 'grado',
    grados: 'grados',
    niveles: 'niveles',
    ciclos: 'ciclos',
    materias: 'materias',
    categoriaDocente: 'categoriaDocente',
    rne: 'rne',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    centroId: 'centroId'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const MateriaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    slug: 'slug',
    categoriaDocente: 'categoriaDocente',
    activo: 'activo',
    createdAt: 'createdAt'
  };

  export type MateriaScalarFieldEnum = (typeof MateriaScalarFieldEnum)[keyof typeof MateriaScalarFieldEnum]


  export const CompetenciaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    orden: 'orden',
    createdAt: 'createdAt'
  };

  export type CompetenciaScalarFieldEnum = (typeof CompetenciaScalarFieldEnum)[keyof typeof CompetenciaScalarFieldEnum]


  export const PeriodoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    fechaInicio: 'fechaInicio',
    fechaFin: 'fechaFin',
    centroId: 'centroId',
    activo: 'activo',
    createdAt: 'createdAt'
  };

  export type PeriodoScalarFieldEnum = (typeof PeriodoScalarFieldEnum)[keyof typeof PeriodoScalarFieldEnum]


  export const EvaluacionScalarFieldEnum: {
    id: 'id',
    nota: 'nota',
    materia: 'materia',
    observaciones: 'observaciones',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    estudianteId: 'estudianteId',
    competenciaId: 'competenciaId',
    periodoId: 'periodoId',
    docenteId: 'docenteId'
  };

  export type EvaluacionScalarFieldEnum = (typeof EvaluacionScalarFieldEnum)[keyof typeof EvaluacionScalarFieldEnum]


  export const SuscripcionScalarFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    plan: 'plan',
    estado: 'estado',
    lemonCustomerId: 'lemonCustomerId',
    lemonSubscriptionId: 'lemonSubscriptionId',
    lemonVariantId: 'lemonVariantId',
    fechaInicio: 'fechaInicio',
    fechaFin: 'fechaFin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SuscripcionScalarFieldEnum = (typeof SuscripcionScalarFieldEnum)[keyof typeof SuscripcionScalarFieldEnum]


  export const PagoScalarFieldEnum: {
    id: 'id',
    suscripcionId: 'suscripcionId',
    monto: 'monto',
    moneda: 'moneda',
    estado: 'estado',
    lemonOrderId: 'lemonOrderId',
    lemonPaymentId: 'lemonPaymentId',
    createdAt: 'createdAt'
  };

  export type PagoScalarFieldEnum = (typeof PagoScalarFieldEnum)[keyof typeof PagoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CentroWhereInput = {
    AND?: CentroWhereInput | CentroWhereInput[]
    OR?: CentroWhereInput[]
    NOT?: CentroWhereInput | CentroWhereInput[]
    id?: StringFilter<"Centro"> | string
    nombre?: StringFilter<"Centro"> | string
    codigo?: StringFilter<"Centro"> | string
    logo?: StringNullableFilter<"Centro"> | string | null
    plan?: StringFilter<"Centro"> | string
    maxDocentes?: IntFilter<"Centro"> | number
    maxEstudiantes?: IntFilter<"Centro"> | number
    tipo?: StringFilter<"Centro"> | string
    activo?: BoolFilter<"Centro"> | boolean
    createdAt?: DateTimeFilter<"Centro"> | Date | string
    updatedAt?: DateTimeFilter<"Centro"> | Date | string
    usuarios?: UsuarioListRelationFilter
    periodos?: PeriodoListRelationFilter
  }

  export type CentroOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    codigo?: SortOrder
    logo?: SortOrderInput | SortOrder
    plan?: SortOrder
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuarios?: UsuarioOrderByRelationAggregateInput
    periodos?: PeriodoOrderByRelationAggregateInput
  }

  export type CentroWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codigo?: string
    AND?: CentroWhereInput | CentroWhereInput[]
    OR?: CentroWhereInput[]
    NOT?: CentroWhereInput | CentroWhereInput[]
    nombre?: StringFilter<"Centro"> | string
    logo?: StringNullableFilter<"Centro"> | string | null
    plan?: StringFilter<"Centro"> | string
    maxDocentes?: IntFilter<"Centro"> | number
    maxEstudiantes?: IntFilter<"Centro"> | number
    tipo?: StringFilter<"Centro"> | string
    activo?: BoolFilter<"Centro"> | boolean
    createdAt?: DateTimeFilter<"Centro"> | Date | string
    updatedAt?: DateTimeFilter<"Centro"> | Date | string
    usuarios?: UsuarioListRelationFilter
    periodos?: PeriodoListRelationFilter
  }, "id" | "codigo">

  export type CentroOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    codigo?: SortOrder
    logo?: SortOrderInput | SortOrder
    plan?: SortOrder
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CentroCountOrderByAggregateInput
    _avg?: CentroAvgOrderByAggregateInput
    _max?: CentroMaxOrderByAggregateInput
    _min?: CentroMinOrderByAggregateInput
    _sum?: CentroSumOrderByAggregateInput
  }

  export type CentroScalarWhereWithAggregatesInput = {
    AND?: CentroScalarWhereWithAggregatesInput | CentroScalarWhereWithAggregatesInput[]
    OR?: CentroScalarWhereWithAggregatesInput[]
    NOT?: CentroScalarWhereWithAggregatesInput | CentroScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Centro"> | string
    nombre?: StringWithAggregatesFilter<"Centro"> | string
    codigo?: StringWithAggregatesFilter<"Centro"> | string
    logo?: StringNullableWithAggregatesFilter<"Centro"> | string | null
    plan?: StringWithAggregatesFilter<"Centro"> | string
    maxDocentes?: IntWithAggregatesFilter<"Centro"> | number
    maxEstudiantes?: IntWithAggregatesFilter<"Centro"> | number
    tipo?: StringWithAggregatesFilter<"Centro"> | string
    activo?: BoolWithAggregatesFilter<"Centro"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Centro"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Centro"> | Date | string
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    genero?: StringNullableFilter<"Usuario"> | string | null
    grado?: StringNullableFilter<"Usuario"> | string | null
    grados?: StringNullableListFilter<"Usuario">
    niveles?: StringNullableListFilter<"Usuario">
    ciclos?: StringNullableListFilter<"Usuario">
    materias?: StringNullableListFilter<"Usuario">
    categoriaDocente?: StringNullableFilter<"Usuario"> | string | null
    rne?: StringNullableFilter<"Usuario"> | string | null
    activo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    centroId?: StringNullableFilter<"Usuario"> | string | null
    centro?: XOR<CentroNullableScalarRelationFilter, CentroWhereInput> | null
    evaluacionesEstudiante?: EvaluacionListRelationFilter
    evaluacionesDocente?: EvaluacionListRelationFilter
    suscripciones?: SuscripcionListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    genero?: SortOrderInput | SortOrder
    grado?: SortOrderInput | SortOrder
    grados?: SortOrder
    niveles?: SortOrder
    ciclos?: SortOrder
    materias?: SortOrder
    categoriaDocente?: SortOrderInput | SortOrder
    rne?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    centroId?: SortOrderInput | SortOrder
    centro?: CentroOrderByWithRelationInput
    evaluacionesEstudiante?: EvaluacionOrderByRelationAggregateInput
    evaluacionesDocente?: EvaluacionOrderByRelationAggregateInput
    suscripciones?: SuscripcionOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    rne?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    genero?: StringNullableFilter<"Usuario"> | string | null
    grado?: StringNullableFilter<"Usuario"> | string | null
    grados?: StringNullableListFilter<"Usuario">
    niveles?: StringNullableListFilter<"Usuario">
    ciclos?: StringNullableListFilter<"Usuario">
    materias?: StringNullableListFilter<"Usuario">
    categoriaDocente?: StringNullableFilter<"Usuario"> | string | null
    activo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    centroId?: StringNullableFilter<"Usuario"> | string | null
    centro?: XOR<CentroNullableScalarRelationFilter, CentroWhereInput> | null
    evaluacionesEstudiante?: EvaluacionListRelationFilter
    evaluacionesDocente?: EvaluacionListRelationFilter
    suscripciones?: SuscripcionListRelationFilter
  }, "id" | "email" | "rne">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    genero?: SortOrderInput | SortOrder
    grado?: SortOrderInput | SortOrder
    grados?: SortOrder
    niveles?: SortOrder
    ciclos?: SortOrder
    materias?: SortOrder
    categoriaDocente?: SortOrderInput | SortOrder
    rne?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    centroId?: SortOrderInput | SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    email?: StringWithAggregatesFilter<"Usuario"> | string
    password?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: StringWithAggregatesFilter<"Usuario"> | string
    genero?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    grado?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    grados?: StringNullableListFilter<"Usuario">
    niveles?: StringNullableListFilter<"Usuario">
    ciclos?: StringNullableListFilter<"Usuario">
    materias?: StringNullableListFilter<"Usuario">
    categoriaDocente?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    rne?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    activo?: BoolWithAggregatesFilter<"Usuario"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Usuario"> | Date | string
    centroId?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
  }

  export type MateriaWhereInput = {
    AND?: MateriaWhereInput | MateriaWhereInput[]
    OR?: MateriaWhereInput[]
    NOT?: MateriaWhereInput | MateriaWhereInput[]
    id?: StringFilter<"Materia"> | string
    nombre?: StringFilter<"Materia"> | string
    slug?: StringFilter<"Materia"> | string
    categoriaDocente?: StringFilter<"Materia"> | string
    activo?: BoolFilter<"Materia"> | boolean
    createdAt?: DateTimeFilter<"Materia"> | Date | string
  }

  export type MateriaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    categoriaDocente?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type MateriaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: MateriaWhereInput | MateriaWhereInput[]
    OR?: MateriaWhereInput[]
    NOT?: MateriaWhereInput | MateriaWhereInput[]
    nombre?: StringFilter<"Materia"> | string
    categoriaDocente?: StringFilter<"Materia"> | string
    activo?: BoolFilter<"Materia"> | boolean
    createdAt?: DateTimeFilter<"Materia"> | Date | string
  }, "id" | "slug">

  export type MateriaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    categoriaDocente?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    _count?: MateriaCountOrderByAggregateInput
    _max?: MateriaMaxOrderByAggregateInput
    _min?: MateriaMinOrderByAggregateInput
  }

  export type MateriaScalarWhereWithAggregatesInput = {
    AND?: MateriaScalarWhereWithAggregatesInput | MateriaScalarWhereWithAggregatesInput[]
    OR?: MateriaScalarWhereWithAggregatesInput[]
    NOT?: MateriaScalarWhereWithAggregatesInput | MateriaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Materia"> | string
    nombre?: StringWithAggregatesFilter<"Materia"> | string
    slug?: StringWithAggregatesFilter<"Materia"> | string
    categoriaDocente?: StringWithAggregatesFilter<"Materia"> | string
    activo?: BoolWithAggregatesFilter<"Materia"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Materia"> | Date | string
  }

  export type CompetenciaWhereInput = {
    AND?: CompetenciaWhereInput | CompetenciaWhereInput[]
    OR?: CompetenciaWhereInput[]
    NOT?: CompetenciaWhereInput | CompetenciaWhereInput[]
    id?: StringFilter<"Competencia"> | string
    nombre?: StringFilter<"Competencia"> | string
    orden?: IntFilter<"Competencia"> | number
    createdAt?: DateTimeFilter<"Competencia"> | Date | string
    evaluaciones?: EvaluacionListRelationFilter
  }

  export type CompetenciaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
    evaluaciones?: EvaluacionOrderByRelationAggregateInput
  }

  export type CompetenciaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompetenciaWhereInput | CompetenciaWhereInput[]
    OR?: CompetenciaWhereInput[]
    NOT?: CompetenciaWhereInput | CompetenciaWhereInput[]
    nombre?: StringFilter<"Competencia"> | string
    orden?: IntFilter<"Competencia"> | number
    createdAt?: DateTimeFilter<"Competencia"> | Date | string
    evaluaciones?: EvaluacionListRelationFilter
  }, "id">

  export type CompetenciaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
    _count?: CompetenciaCountOrderByAggregateInput
    _avg?: CompetenciaAvgOrderByAggregateInput
    _max?: CompetenciaMaxOrderByAggregateInput
    _min?: CompetenciaMinOrderByAggregateInput
    _sum?: CompetenciaSumOrderByAggregateInput
  }

  export type CompetenciaScalarWhereWithAggregatesInput = {
    AND?: CompetenciaScalarWhereWithAggregatesInput | CompetenciaScalarWhereWithAggregatesInput[]
    OR?: CompetenciaScalarWhereWithAggregatesInput[]
    NOT?: CompetenciaScalarWhereWithAggregatesInput | CompetenciaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Competencia"> | string
    nombre?: StringWithAggregatesFilter<"Competencia"> | string
    orden?: IntWithAggregatesFilter<"Competencia"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Competencia"> | Date | string
  }

  export type PeriodoWhereInput = {
    AND?: PeriodoWhereInput | PeriodoWhereInput[]
    OR?: PeriodoWhereInput[]
    NOT?: PeriodoWhereInput | PeriodoWhereInput[]
    id?: StringFilter<"Periodo"> | string
    nombre?: StringFilter<"Periodo"> | string
    fechaInicio?: DateTimeFilter<"Periodo"> | Date | string
    fechaFin?: DateTimeFilter<"Periodo"> | Date | string
    centroId?: StringFilter<"Periodo"> | string
    activo?: BoolFilter<"Periodo"> | boolean
    createdAt?: DateTimeFilter<"Periodo"> | Date | string
    centro?: XOR<CentroScalarRelationFilter, CentroWhereInput>
    evaluaciones?: EvaluacionListRelationFilter
  }

  export type PeriodoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    centroId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    centro?: CentroOrderByWithRelationInput
    evaluaciones?: EvaluacionOrderByRelationAggregateInput
  }

  export type PeriodoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PeriodoWhereInput | PeriodoWhereInput[]
    OR?: PeriodoWhereInput[]
    NOT?: PeriodoWhereInput | PeriodoWhereInput[]
    nombre?: StringFilter<"Periodo"> | string
    fechaInicio?: DateTimeFilter<"Periodo"> | Date | string
    fechaFin?: DateTimeFilter<"Periodo"> | Date | string
    centroId?: StringFilter<"Periodo"> | string
    activo?: BoolFilter<"Periodo"> | boolean
    createdAt?: DateTimeFilter<"Periodo"> | Date | string
    centro?: XOR<CentroScalarRelationFilter, CentroWhereInput>
    evaluaciones?: EvaluacionListRelationFilter
  }, "id">

  export type PeriodoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    centroId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    _count?: PeriodoCountOrderByAggregateInput
    _max?: PeriodoMaxOrderByAggregateInput
    _min?: PeriodoMinOrderByAggregateInput
  }

  export type PeriodoScalarWhereWithAggregatesInput = {
    AND?: PeriodoScalarWhereWithAggregatesInput | PeriodoScalarWhereWithAggregatesInput[]
    OR?: PeriodoScalarWhereWithAggregatesInput[]
    NOT?: PeriodoScalarWhereWithAggregatesInput | PeriodoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Periodo"> | string
    nombre?: StringWithAggregatesFilter<"Periodo"> | string
    fechaInicio?: DateTimeWithAggregatesFilter<"Periodo"> | Date | string
    fechaFin?: DateTimeWithAggregatesFilter<"Periodo"> | Date | string
    centroId?: StringWithAggregatesFilter<"Periodo"> | string
    activo?: BoolWithAggregatesFilter<"Periodo"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Periodo"> | Date | string
  }

  export type EvaluacionWhereInput = {
    AND?: EvaluacionWhereInput | EvaluacionWhereInput[]
    OR?: EvaluacionWhereInput[]
    NOT?: EvaluacionWhereInput | EvaluacionWhereInput[]
    id?: StringFilter<"Evaluacion"> | string
    nota?: FloatFilter<"Evaluacion"> | number
    materia?: StringNullableFilter<"Evaluacion"> | string | null
    observaciones?: StringNullableFilter<"Evaluacion"> | string | null
    createdAt?: DateTimeFilter<"Evaluacion"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluacion"> | Date | string
    estudianteId?: StringFilter<"Evaluacion"> | string
    competenciaId?: StringFilter<"Evaluacion"> | string
    periodoId?: StringFilter<"Evaluacion"> | string
    docenteId?: StringFilter<"Evaluacion"> | string
    estudiante?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    competencia?: XOR<CompetenciaScalarRelationFilter, CompetenciaWhereInput>
    periodo?: XOR<PeriodoScalarRelationFilter, PeriodoWhereInput>
    docente?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type EvaluacionOrderByWithRelationInput = {
    id?: SortOrder
    nota?: SortOrder
    materia?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    estudianteId?: SortOrder
    competenciaId?: SortOrder
    periodoId?: SortOrder
    docenteId?: SortOrder
    estudiante?: UsuarioOrderByWithRelationInput
    competencia?: CompetenciaOrderByWithRelationInput
    periodo?: PeriodoOrderByWithRelationInput
    docente?: UsuarioOrderByWithRelationInput
  }

  export type EvaluacionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    estudianteId_competenciaId_periodoId?: EvaluacionEstudianteIdCompetenciaIdPeriodoIdCompoundUniqueInput
    AND?: EvaluacionWhereInput | EvaluacionWhereInput[]
    OR?: EvaluacionWhereInput[]
    NOT?: EvaluacionWhereInput | EvaluacionWhereInput[]
    nota?: FloatFilter<"Evaluacion"> | number
    materia?: StringNullableFilter<"Evaluacion"> | string | null
    observaciones?: StringNullableFilter<"Evaluacion"> | string | null
    createdAt?: DateTimeFilter<"Evaluacion"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluacion"> | Date | string
    estudianteId?: StringFilter<"Evaluacion"> | string
    competenciaId?: StringFilter<"Evaluacion"> | string
    periodoId?: StringFilter<"Evaluacion"> | string
    docenteId?: StringFilter<"Evaluacion"> | string
    estudiante?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    competencia?: XOR<CompetenciaScalarRelationFilter, CompetenciaWhereInput>
    periodo?: XOR<PeriodoScalarRelationFilter, PeriodoWhereInput>
    docente?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id" | "estudianteId_competenciaId_periodoId">

  export type EvaluacionOrderByWithAggregationInput = {
    id?: SortOrder
    nota?: SortOrder
    materia?: SortOrderInput | SortOrder
    observaciones?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    estudianteId?: SortOrder
    competenciaId?: SortOrder
    periodoId?: SortOrder
    docenteId?: SortOrder
    _count?: EvaluacionCountOrderByAggregateInput
    _avg?: EvaluacionAvgOrderByAggregateInput
    _max?: EvaluacionMaxOrderByAggregateInput
    _min?: EvaluacionMinOrderByAggregateInput
    _sum?: EvaluacionSumOrderByAggregateInput
  }

  export type EvaluacionScalarWhereWithAggregatesInput = {
    AND?: EvaluacionScalarWhereWithAggregatesInput | EvaluacionScalarWhereWithAggregatesInput[]
    OR?: EvaluacionScalarWhereWithAggregatesInput[]
    NOT?: EvaluacionScalarWhereWithAggregatesInput | EvaluacionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Evaluacion"> | string
    nota?: FloatWithAggregatesFilter<"Evaluacion"> | number
    materia?: StringNullableWithAggregatesFilter<"Evaluacion"> | string | null
    observaciones?: StringNullableWithAggregatesFilter<"Evaluacion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Evaluacion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Evaluacion"> | Date | string
    estudianteId?: StringWithAggregatesFilter<"Evaluacion"> | string
    competenciaId?: StringWithAggregatesFilter<"Evaluacion"> | string
    periodoId?: StringWithAggregatesFilter<"Evaluacion"> | string
    docenteId?: StringWithAggregatesFilter<"Evaluacion"> | string
  }

  export type SuscripcionWhereInput = {
    AND?: SuscripcionWhereInput | SuscripcionWhereInput[]
    OR?: SuscripcionWhereInput[]
    NOT?: SuscripcionWhereInput | SuscripcionWhereInput[]
    id?: StringFilter<"Suscripcion"> | string
    usuarioId?: StringFilter<"Suscripcion"> | string
    plan?: StringFilter<"Suscripcion"> | string
    estado?: StringFilter<"Suscripcion"> | string
    lemonCustomerId?: StringNullableFilter<"Suscripcion"> | string | null
    lemonSubscriptionId?: StringNullableFilter<"Suscripcion"> | string | null
    lemonVariantId?: StringNullableFilter<"Suscripcion"> | string | null
    fechaInicio?: DateTimeNullableFilter<"Suscripcion"> | Date | string | null
    fechaFin?: DateTimeNullableFilter<"Suscripcion"> | Date | string | null
    createdAt?: DateTimeFilter<"Suscripcion"> | Date | string
    updatedAt?: DateTimeFilter<"Suscripcion"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    pagos?: PagoListRelationFilter
  }

  export type SuscripcionOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    plan?: SortOrder
    estado?: SortOrder
    lemonCustomerId?: SortOrderInput | SortOrder
    lemonSubscriptionId?: SortOrderInput | SortOrder
    lemonVariantId?: SortOrderInput | SortOrder
    fechaInicio?: SortOrderInput | SortOrder
    fechaFin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
    pagos?: PagoOrderByRelationAggregateInput
  }

  export type SuscripcionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuscripcionWhereInput | SuscripcionWhereInput[]
    OR?: SuscripcionWhereInput[]
    NOT?: SuscripcionWhereInput | SuscripcionWhereInput[]
    usuarioId?: StringFilter<"Suscripcion"> | string
    plan?: StringFilter<"Suscripcion"> | string
    estado?: StringFilter<"Suscripcion"> | string
    lemonCustomerId?: StringNullableFilter<"Suscripcion"> | string | null
    lemonSubscriptionId?: StringNullableFilter<"Suscripcion"> | string | null
    lemonVariantId?: StringNullableFilter<"Suscripcion"> | string | null
    fechaInicio?: DateTimeNullableFilter<"Suscripcion"> | Date | string | null
    fechaFin?: DateTimeNullableFilter<"Suscripcion"> | Date | string | null
    createdAt?: DateTimeFilter<"Suscripcion"> | Date | string
    updatedAt?: DateTimeFilter<"Suscripcion"> | Date | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    pagos?: PagoListRelationFilter
  }, "id">

  export type SuscripcionOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    plan?: SortOrder
    estado?: SortOrder
    lemonCustomerId?: SortOrderInput | SortOrder
    lemonSubscriptionId?: SortOrderInput | SortOrder
    lemonVariantId?: SortOrderInput | SortOrder
    fechaInicio?: SortOrderInput | SortOrder
    fechaFin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SuscripcionCountOrderByAggregateInput
    _max?: SuscripcionMaxOrderByAggregateInput
    _min?: SuscripcionMinOrderByAggregateInput
  }

  export type SuscripcionScalarWhereWithAggregatesInput = {
    AND?: SuscripcionScalarWhereWithAggregatesInput | SuscripcionScalarWhereWithAggregatesInput[]
    OR?: SuscripcionScalarWhereWithAggregatesInput[]
    NOT?: SuscripcionScalarWhereWithAggregatesInput | SuscripcionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Suscripcion"> | string
    usuarioId?: StringWithAggregatesFilter<"Suscripcion"> | string
    plan?: StringWithAggregatesFilter<"Suscripcion"> | string
    estado?: StringWithAggregatesFilter<"Suscripcion"> | string
    lemonCustomerId?: StringNullableWithAggregatesFilter<"Suscripcion"> | string | null
    lemonSubscriptionId?: StringNullableWithAggregatesFilter<"Suscripcion"> | string | null
    lemonVariantId?: StringNullableWithAggregatesFilter<"Suscripcion"> | string | null
    fechaInicio?: DateTimeNullableWithAggregatesFilter<"Suscripcion"> | Date | string | null
    fechaFin?: DateTimeNullableWithAggregatesFilter<"Suscripcion"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Suscripcion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Suscripcion"> | Date | string
  }

  export type PagoWhereInput = {
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    id?: StringFilter<"Pago"> | string
    suscripcionId?: StringFilter<"Pago"> | string
    monto?: FloatFilter<"Pago"> | number
    moneda?: StringFilter<"Pago"> | string
    estado?: StringFilter<"Pago"> | string
    lemonOrderId?: StringNullableFilter<"Pago"> | string | null
    lemonPaymentId?: StringNullableFilter<"Pago"> | string | null
    createdAt?: DateTimeFilter<"Pago"> | Date | string
    suscripcion?: XOR<SuscripcionScalarRelationFilter, SuscripcionWhereInput>
  }

  export type PagoOrderByWithRelationInput = {
    id?: SortOrder
    suscripcionId?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    lemonOrderId?: SortOrderInput | SortOrder
    lemonPaymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    suscripcion?: SuscripcionOrderByWithRelationInput
  }

  export type PagoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PagoWhereInput | PagoWhereInput[]
    OR?: PagoWhereInput[]
    NOT?: PagoWhereInput | PagoWhereInput[]
    suscripcionId?: StringFilter<"Pago"> | string
    monto?: FloatFilter<"Pago"> | number
    moneda?: StringFilter<"Pago"> | string
    estado?: StringFilter<"Pago"> | string
    lemonOrderId?: StringNullableFilter<"Pago"> | string | null
    lemonPaymentId?: StringNullableFilter<"Pago"> | string | null
    createdAt?: DateTimeFilter<"Pago"> | Date | string
    suscripcion?: XOR<SuscripcionScalarRelationFilter, SuscripcionWhereInput>
  }, "id">

  export type PagoOrderByWithAggregationInput = {
    id?: SortOrder
    suscripcionId?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    lemonOrderId?: SortOrderInput | SortOrder
    lemonPaymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PagoCountOrderByAggregateInput
    _avg?: PagoAvgOrderByAggregateInput
    _max?: PagoMaxOrderByAggregateInput
    _min?: PagoMinOrderByAggregateInput
    _sum?: PagoSumOrderByAggregateInput
  }

  export type PagoScalarWhereWithAggregatesInput = {
    AND?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    OR?: PagoScalarWhereWithAggregatesInput[]
    NOT?: PagoScalarWhereWithAggregatesInput | PagoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pago"> | string
    suscripcionId?: StringWithAggregatesFilter<"Pago"> | string
    monto?: FloatWithAggregatesFilter<"Pago"> | number
    moneda?: StringWithAggregatesFilter<"Pago"> | string
    estado?: StringWithAggregatesFilter<"Pago"> | string
    lemonOrderId?: StringNullableWithAggregatesFilter<"Pago"> | string | null
    lemonPaymentId?: StringNullableWithAggregatesFilter<"Pago"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pago"> | Date | string
  }

  export type CentroCreateInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutCentroInput
    periodos?: PeriodoCreateNestedManyWithoutCentroInput
  }

  export type CentroUncheckedCreateInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutCentroInput
    periodos?: PeriodoUncheckedCreateNestedManyWithoutCentroInput
  }

  export type CentroUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutCentroNestedInput
    periodos?: PeriodoUpdateManyWithoutCentroNestedInput
  }

  export type CentroUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutCentroNestedInput
    periodos?: PeriodoUncheckedUpdateManyWithoutCentroNestedInput
  }

  export type CentroCreateManyInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CentroUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CentroUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centro?: CentroCreateNestedOneWithoutUsuariosInput
    evaluacionesEstudiante?: EvaluacionCreateNestedManyWithoutEstudianteInput
    evaluacionesDocente?: EvaluacionCreateNestedManyWithoutDocenteInput
    suscripciones?: SuscripcionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centroId?: string | null
    evaluacionesEstudiante?: EvaluacionUncheckedCreateNestedManyWithoutEstudianteInput
    evaluacionesDocente?: EvaluacionUncheckedCreateNestedManyWithoutDocenteInput
    suscripciones?: SuscripcionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centro?: CentroUpdateOneWithoutUsuariosNestedInput
    evaluacionesEstudiante?: EvaluacionUpdateManyWithoutEstudianteNestedInput
    evaluacionesDocente?: EvaluacionUpdateManyWithoutDocenteNestedInput
    suscripciones?: SuscripcionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: NullableStringFieldUpdateOperationsInput | string | null
    evaluacionesEstudiante?: EvaluacionUncheckedUpdateManyWithoutEstudianteNestedInput
    evaluacionesDocente?: EvaluacionUncheckedUpdateManyWithoutDocenteNestedInput
    suscripciones?: SuscripcionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centroId?: string | null
  }

  export type UsuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MateriaCreateInput = {
    id?: string
    nombre: string
    slug: string
    categoriaDocente: string
    activo?: boolean
    createdAt?: Date | string
  }

  export type MateriaUncheckedCreateInput = {
    id?: string
    nombre: string
    slug: string
    categoriaDocente: string
    activo?: boolean
    createdAt?: Date | string
  }

  export type MateriaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoriaDocente?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MateriaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoriaDocente?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MateriaCreateManyInput = {
    id?: string
    nombre: string
    slug: string
    categoriaDocente: string
    activo?: boolean
    createdAt?: Date | string
  }

  export type MateriaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoriaDocente?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MateriaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoriaDocente?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetenciaCreateInput = {
    id?: string
    nombre: string
    orden: number
    createdAt?: Date | string
    evaluaciones?: EvaluacionCreateNestedManyWithoutCompetenciaInput
  }

  export type CompetenciaUncheckedCreateInput = {
    id?: string
    nombre: string
    orden: number
    createdAt?: Date | string
    evaluaciones?: EvaluacionUncheckedCreateNestedManyWithoutCompetenciaInput
  }

  export type CompetenciaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluaciones?: EvaluacionUpdateManyWithoutCompetenciaNestedInput
  }

  export type CompetenciaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluaciones?: EvaluacionUncheckedUpdateManyWithoutCompetenciaNestedInput
  }

  export type CompetenciaCreateManyInput = {
    id?: string
    nombre: string
    orden: number
    createdAt?: Date | string
  }

  export type CompetenciaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetenciaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodoCreateInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    activo?: boolean
    createdAt?: Date | string
    centro: CentroCreateNestedOneWithoutPeriodosInput
    evaluaciones?: EvaluacionCreateNestedManyWithoutPeriodoInput
  }

  export type PeriodoUncheckedCreateInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    centroId: string
    activo?: boolean
    createdAt?: Date | string
    evaluaciones?: EvaluacionUncheckedCreateNestedManyWithoutPeriodoInput
  }

  export type PeriodoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centro?: CentroUpdateOneRequiredWithoutPeriodosNestedInput
    evaluaciones?: EvaluacionUpdateManyWithoutPeriodoNestedInput
  }

  export type PeriodoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluaciones?: EvaluacionUncheckedUpdateManyWithoutPeriodoNestedInput
  }

  export type PeriodoCreateManyInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    centroId: string
    activo?: boolean
    createdAt?: Date | string
  }

  export type PeriodoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluacionCreateInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudiante: UsuarioCreateNestedOneWithoutEvaluacionesEstudianteInput
    competencia: CompetenciaCreateNestedOneWithoutEvaluacionesInput
    periodo: PeriodoCreateNestedOneWithoutEvaluacionesInput
    docente: UsuarioCreateNestedOneWithoutEvaluacionesDocenteInput
  }

  export type EvaluacionUncheckedCreateInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    competenciaId: string
    periodoId: string
    docenteId: string
  }

  export type EvaluacionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudiante?: UsuarioUpdateOneRequiredWithoutEvaluacionesEstudianteNestedInput
    competencia?: CompetenciaUpdateOneRequiredWithoutEvaluacionesNestedInput
    periodo?: PeriodoUpdateOneRequiredWithoutEvaluacionesNestedInput
    docente?: UsuarioUpdateOneRequiredWithoutEvaluacionesDocenteNestedInput
  }

  export type EvaluacionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionCreateManyInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    competenciaId: string
    periodoId: string
    docenteId: string
  }

  export type EvaluacionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluacionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type SuscripcionCreateInput = {
    id?: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutSuscripcionesInput
    pagos?: PagoCreateNestedManyWithoutSuscripcionInput
  }

  export type SuscripcionUncheckedCreateInput = {
    id?: string
    usuarioId: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pagos?: PagoUncheckedCreateNestedManyWithoutSuscripcionInput
  }

  export type SuscripcionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutSuscripcionesNestedInput
    pagos?: PagoUpdateManyWithoutSuscripcionNestedInput
  }

  export type SuscripcionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pagos?: PagoUncheckedUpdateManyWithoutSuscripcionNestedInput
  }

  export type SuscripcionCreateManyInput = {
    id?: string
    usuarioId: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuscripcionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuscripcionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoCreateInput = {
    id?: string
    monto: number
    moneda?: string
    estado?: string
    lemonOrderId?: string | null
    lemonPaymentId?: string | null
    createdAt?: Date | string
    suscripcion: SuscripcionCreateNestedOneWithoutPagosInput
  }

  export type PagoUncheckedCreateInput = {
    id?: string
    suscripcionId: string
    monto: number
    moneda?: string
    estado?: string
    lemonOrderId?: string | null
    lemonPaymentId?: string | null
    createdAt?: Date | string
  }

  export type PagoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    suscripcion?: SuscripcionUpdateOneRequiredWithoutPagosNestedInput
  }

  export type PagoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    suscripcionId?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoCreateManyInput = {
    id?: string
    suscripcionId: string
    monto: number
    moneda?: string
    estado?: string
    lemonOrderId?: string | null
    lemonPaymentId?: string | null
    createdAt?: Date | string
  }

  export type PagoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    suscripcionId?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsuarioListRelationFilter = {
    every?: UsuarioWhereInput
    some?: UsuarioWhereInput
    none?: UsuarioWhereInput
  }

  export type PeriodoListRelationFilter = {
    every?: PeriodoWhereInput
    some?: PeriodoWhereInput
    none?: PeriodoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UsuarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PeriodoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CentroCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    codigo?: SortOrder
    logo?: SortOrder
    plan?: SortOrder
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CentroAvgOrderByAggregateInput = {
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
  }

  export type CentroMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    codigo?: SortOrder
    logo?: SortOrder
    plan?: SortOrder
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CentroMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    codigo?: SortOrder
    logo?: SortOrder
    plan?: SortOrder
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
    tipo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CentroSumOrderByAggregateInput = {
    maxDocentes?: SortOrder
    maxEstudiantes?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type CentroNullableScalarRelationFilter = {
    is?: CentroWhereInput | null
    isNot?: CentroWhereInput | null
  }

  export type EvaluacionListRelationFilter = {
    every?: EvaluacionWhereInput
    some?: EvaluacionWhereInput
    none?: EvaluacionWhereInput
  }

  export type SuscripcionListRelationFilter = {
    every?: SuscripcionWhereInput
    some?: SuscripcionWhereInput
    none?: SuscripcionWhereInput
  }

  export type EvaluacionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SuscripcionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    genero?: SortOrder
    grado?: SortOrder
    grados?: SortOrder
    niveles?: SortOrder
    ciclos?: SortOrder
    materias?: SortOrder
    categoriaDocente?: SortOrder
    rne?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    centroId?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    genero?: SortOrder
    grado?: SortOrder
    categoriaDocente?: SortOrder
    rne?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    centroId?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    password?: SortOrder
    rol?: SortOrder
    genero?: SortOrder
    grado?: SortOrder
    categoriaDocente?: SortOrder
    rne?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    centroId?: SortOrder
  }

  export type MateriaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    categoriaDocente?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type MateriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    categoriaDocente?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type MateriaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    slug?: SortOrder
    categoriaDocente?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type CompetenciaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type CompetenciaAvgOrderByAggregateInput = {
    orden?: SortOrder
  }

  export type CompetenciaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type CompetenciaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    orden?: SortOrder
    createdAt?: SortOrder
  }

  export type CompetenciaSumOrderByAggregateInput = {
    orden?: SortOrder
  }

  export type CentroScalarRelationFilter = {
    is?: CentroWhereInput
    isNot?: CentroWhereInput
  }

  export type PeriodoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    centroId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type PeriodoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    centroId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type PeriodoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    centroId?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type CompetenciaScalarRelationFilter = {
    is?: CompetenciaWhereInput
    isNot?: CompetenciaWhereInput
  }

  export type PeriodoScalarRelationFilter = {
    is?: PeriodoWhereInput
    isNot?: PeriodoWhereInput
  }

  export type EvaluacionEstudianteIdCompetenciaIdPeriodoIdCompoundUniqueInput = {
    estudianteId: string
    competenciaId: string
    periodoId: string
  }

  export type EvaluacionCountOrderByAggregateInput = {
    id?: SortOrder
    nota?: SortOrder
    materia?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    estudianteId?: SortOrder
    competenciaId?: SortOrder
    periodoId?: SortOrder
    docenteId?: SortOrder
  }

  export type EvaluacionAvgOrderByAggregateInput = {
    nota?: SortOrder
  }

  export type EvaluacionMaxOrderByAggregateInput = {
    id?: SortOrder
    nota?: SortOrder
    materia?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    estudianteId?: SortOrder
    competenciaId?: SortOrder
    periodoId?: SortOrder
    docenteId?: SortOrder
  }

  export type EvaluacionMinOrderByAggregateInput = {
    id?: SortOrder
    nota?: SortOrder
    materia?: SortOrder
    observaciones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    estudianteId?: SortOrder
    competenciaId?: SortOrder
    periodoId?: SortOrder
    docenteId?: SortOrder
  }

  export type EvaluacionSumOrderByAggregateInput = {
    nota?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PagoListRelationFilter = {
    every?: PagoWhereInput
    some?: PagoWhereInput
    none?: PagoWhereInput
  }

  export type PagoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SuscripcionCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    plan?: SortOrder
    estado?: SortOrder
    lemonCustomerId?: SortOrder
    lemonSubscriptionId?: SortOrder
    lemonVariantId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuscripcionMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    plan?: SortOrder
    estado?: SortOrder
    lemonCustomerId?: SortOrder
    lemonSubscriptionId?: SortOrder
    lemonVariantId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuscripcionMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    plan?: SortOrder
    estado?: SortOrder
    lemonCustomerId?: SortOrder
    lemonSubscriptionId?: SortOrder
    lemonVariantId?: SortOrder
    fechaInicio?: SortOrder
    fechaFin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SuscripcionScalarRelationFilter = {
    is?: SuscripcionWhereInput
    isNot?: SuscripcionWhereInput
  }

  export type PagoCountOrderByAggregateInput = {
    id?: SortOrder
    suscripcionId?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    lemonOrderId?: SortOrder
    lemonPaymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoAvgOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type PagoMaxOrderByAggregateInput = {
    id?: SortOrder
    suscripcionId?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    lemonOrderId?: SortOrder
    lemonPaymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoMinOrderByAggregateInput = {
    id?: SortOrder
    suscripcionId?: SortOrder
    monto?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    lemonOrderId?: SortOrder
    lemonPaymentId?: SortOrder
    createdAt?: SortOrder
  }

  export type PagoSumOrderByAggregateInput = {
    monto?: SortOrder
  }

  export type UsuarioCreateNestedManyWithoutCentroInput = {
    create?: XOR<UsuarioCreateWithoutCentroInput, UsuarioUncheckedCreateWithoutCentroInput> | UsuarioCreateWithoutCentroInput[] | UsuarioUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCentroInput | UsuarioCreateOrConnectWithoutCentroInput[]
    createMany?: UsuarioCreateManyCentroInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type PeriodoCreateNestedManyWithoutCentroInput = {
    create?: XOR<PeriodoCreateWithoutCentroInput, PeriodoUncheckedCreateWithoutCentroInput> | PeriodoCreateWithoutCentroInput[] | PeriodoUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: PeriodoCreateOrConnectWithoutCentroInput | PeriodoCreateOrConnectWithoutCentroInput[]
    createMany?: PeriodoCreateManyCentroInputEnvelope
    connect?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
  }

  export type UsuarioUncheckedCreateNestedManyWithoutCentroInput = {
    create?: XOR<UsuarioCreateWithoutCentroInput, UsuarioUncheckedCreateWithoutCentroInput> | UsuarioCreateWithoutCentroInput[] | UsuarioUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCentroInput | UsuarioCreateOrConnectWithoutCentroInput[]
    createMany?: UsuarioCreateManyCentroInputEnvelope
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
  }

  export type PeriodoUncheckedCreateNestedManyWithoutCentroInput = {
    create?: XOR<PeriodoCreateWithoutCentroInput, PeriodoUncheckedCreateWithoutCentroInput> | PeriodoCreateWithoutCentroInput[] | PeriodoUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: PeriodoCreateOrConnectWithoutCentroInput | PeriodoCreateOrConnectWithoutCentroInput[]
    createMany?: PeriodoCreateManyCentroInputEnvelope
    connect?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UsuarioUpdateManyWithoutCentroNestedInput = {
    create?: XOR<UsuarioCreateWithoutCentroInput, UsuarioUncheckedCreateWithoutCentroInput> | UsuarioCreateWithoutCentroInput[] | UsuarioUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCentroInput | UsuarioCreateOrConnectWithoutCentroInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutCentroInput | UsuarioUpsertWithWhereUniqueWithoutCentroInput[]
    createMany?: UsuarioCreateManyCentroInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutCentroInput | UsuarioUpdateWithWhereUniqueWithoutCentroInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutCentroInput | UsuarioUpdateManyWithWhereWithoutCentroInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type PeriodoUpdateManyWithoutCentroNestedInput = {
    create?: XOR<PeriodoCreateWithoutCentroInput, PeriodoUncheckedCreateWithoutCentroInput> | PeriodoCreateWithoutCentroInput[] | PeriodoUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: PeriodoCreateOrConnectWithoutCentroInput | PeriodoCreateOrConnectWithoutCentroInput[]
    upsert?: PeriodoUpsertWithWhereUniqueWithoutCentroInput | PeriodoUpsertWithWhereUniqueWithoutCentroInput[]
    createMany?: PeriodoCreateManyCentroInputEnvelope
    set?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    disconnect?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    delete?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    connect?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    update?: PeriodoUpdateWithWhereUniqueWithoutCentroInput | PeriodoUpdateWithWhereUniqueWithoutCentroInput[]
    updateMany?: PeriodoUpdateManyWithWhereWithoutCentroInput | PeriodoUpdateManyWithWhereWithoutCentroInput[]
    deleteMany?: PeriodoScalarWhereInput | PeriodoScalarWhereInput[]
  }

  export type UsuarioUncheckedUpdateManyWithoutCentroNestedInput = {
    create?: XOR<UsuarioCreateWithoutCentroInput, UsuarioUncheckedCreateWithoutCentroInput> | UsuarioCreateWithoutCentroInput[] | UsuarioUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: UsuarioCreateOrConnectWithoutCentroInput | UsuarioCreateOrConnectWithoutCentroInput[]
    upsert?: UsuarioUpsertWithWhereUniqueWithoutCentroInput | UsuarioUpsertWithWhereUniqueWithoutCentroInput[]
    createMany?: UsuarioCreateManyCentroInputEnvelope
    set?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    disconnect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    delete?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    connect?: UsuarioWhereUniqueInput | UsuarioWhereUniqueInput[]
    update?: UsuarioUpdateWithWhereUniqueWithoutCentroInput | UsuarioUpdateWithWhereUniqueWithoutCentroInput[]
    updateMany?: UsuarioUpdateManyWithWhereWithoutCentroInput | UsuarioUpdateManyWithWhereWithoutCentroInput[]
    deleteMany?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
  }

  export type PeriodoUncheckedUpdateManyWithoutCentroNestedInput = {
    create?: XOR<PeriodoCreateWithoutCentroInput, PeriodoUncheckedCreateWithoutCentroInput> | PeriodoCreateWithoutCentroInput[] | PeriodoUncheckedCreateWithoutCentroInput[]
    connectOrCreate?: PeriodoCreateOrConnectWithoutCentroInput | PeriodoCreateOrConnectWithoutCentroInput[]
    upsert?: PeriodoUpsertWithWhereUniqueWithoutCentroInput | PeriodoUpsertWithWhereUniqueWithoutCentroInput[]
    createMany?: PeriodoCreateManyCentroInputEnvelope
    set?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    disconnect?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    delete?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    connect?: PeriodoWhereUniqueInput | PeriodoWhereUniqueInput[]
    update?: PeriodoUpdateWithWhereUniqueWithoutCentroInput | PeriodoUpdateWithWhereUniqueWithoutCentroInput[]
    updateMany?: PeriodoUpdateManyWithWhereWithoutCentroInput | PeriodoUpdateManyWithWhereWithoutCentroInput[]
    deleteMany?: PeriodoScalarWhereInput | PeriodoScalarWhereInput[]
  }

  export type UsuarioCreategradosInput = {
    set: string[]
  }

  export type UsuarioCreatenivelesInput = {
    set: string[]
  }

  export type UsuarioCreateciclosInput = {
    set: string[]
  }

  export type UsuarioCreatemateriasInput = {
    set: string[]
  }

  export type CentroCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<CentroCreateWithoutUsuariosInput, CentroUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: CentroCreateOrConnectWithoutUsuariosInput
    connect?: CentroWhereUniqueInput
  }

  export type EvaluacionCreateNestedManyWithoutEstudianteInput = {
    create?: XOR<EvaluacionCreateWithoutEstudianteInput, EvaluacionUncheckedCreateWithoutEstudianteInput> | EvaluacionCreateWithoutEstudianteInput[] | EvaluacionUncheckedCreateWithoutEstudianteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutEstudianteInput | EvaluacionCreateOrConnectWithoutEstudianteInput[]
    createMany?: EvaluacionCreateManyEstudianteInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type EvaluacionCreateNestedManyWithoutDocenteInput = {
    create?: XOR<EvaluacionCreateWithoutDocenteInput, EvaluacionUncheckedCreateWithoutDocenteInput> | EvaluacionCreateWithoutDocenteInput[] | EvaluacionUncheckedCreateWithoutDocenteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutDocenteInput | EvaluacionCreateOrConnectWithoutDocenteInput[]
    createMany?: EvaluacionCreateManyDocenteInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type SuscripcionCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<SuscripcionCreateWithoutUsuarioInput, SuscripcionUncheckedCreateWithoutUsuarioInput> | SuscripcionCreateWithoutUsuarioInput[] | SuscripcionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SuscripcionCreateOrConnectWithoutUsuarioInput | SuscripcionCreateOrConnectWithoutUsuarioInput[]
    createMany?: SuscripcionCreateManyUsuarioInputEnvelope
    connect?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
  }

  export type EvaluacionUncheckedCreateNestedManyWithoutEstudianteInput = {
    create?: XOR<EvaluacionCreateWithoutEstudianteInput, EvaluacionUncheckedCreateWithoutEstudianteInput> | EvaluacionCreateWithoutEstudianteInput[] | EvaluacionUncheckedCreateWithoutEstudianteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutEstudianteInput | EvaluacionCreateOrConnectWithoutEstudianteInput[]
    createMany?: EvaluacionCreateManyEstudianteInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type EvaluacionUncheckedCreateNestedManyWithoutDocenteInput = {
    create?: XOR<EvaluacionCreateWithoutDocenteInput, EvaluacionUncheckedCreateWithoutDocenteInput> | EvaluacionCreateWithoutDocenteInput[] | EvaluacionUncheckedCreateWithoutDocenteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutDocenteInput | EvaluacionCreateOrConnectWithoutDocenteInput[]
    createMany?: EvaluacionCreateManyDocenteInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type SuscripcionUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<SuscripcionCreateWithoutUsuarioInput, SuscripcionUncheckedCreateWithoutUsuarioInput> | SuscripcionCreateWithoutUsuarioInput[] | SuscripcionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SuscripcionCreateOrConnectWithoutUsuarioInput | SuscripcionCreateOrConnectWithoutUsuarioInput[]
    createMany?: SuscripcionCreateManyUsuarioInputEnvelope
    connect?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
  }

  export type UsuarioUpdategradosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UsuarioUpdatenivelesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UsuarioUpdateciclosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UsuarioUpdatemateriasInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CentroUpdateOneWithoutUsuariosNestedInput = {
    create?: XOR<CentroCreateWithoutUsuariosInput, CentroUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: CentroCreateOrConnectWithoutUsuariosInput
    upsert?: CentroUpsertWithoutUsuariosInput
    disconnect?: CentroWhereInput | boolean
    delete?: CentroWhereInput | boolean
    connect?: CentroWhereUniqueInput
    update?: XOR<XOR<CentroUpdateToOneWithWhereWithoutUsuariosInput, CentroUpdateWithoutUsuariosInput>, CentroUncheckedUpdateWithoutUsuariosInput>
  }

  export type EvaluacionUpdateManyWithoutEstudianteNestedInput = {
    create?: XOR<EvaluacionCreateWithoutEstudianteInput, EvaluacionUncheckedCreateWithoutEstudianteInput> | EvaluacionCreateWithoutEstudianteInput[] | EvaluacionUncheckedCreateWithoutEstudianteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutEstudianteInput | EvaluacionCreateOrConnectWithoutEstudianteInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutEstudianteInput | EvaluacionUpsertWithWhereUniqueWithoutEstudianteInput[]
    createMany?: EvaluacionCreateManyEstudianteInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutEstudianteInput | EvaluacionUpdateWithWhereUniqueWithoutEstudianteInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutEstudianteInput | EvaluacionUpdateManyWithWhereWithoutEstudianteInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type EvaluacionUpdateManyWithoutDocenteNestedInput = {
    create?: XOR<EvaluacionCreateWithoutDocenteInput, EvaluacionUncheckedCreateWithoutDocenteInput> | EvaluacionCreateWithoutDocenteInput[] | EvaluacionUncheckedCreateWithoutDocenteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutDocenteInput | EvaluacionCreateOrConnectWithoutDocenteInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutDocenteInput | EvaluacionUpsertWithWhereUniqueWithoutDocenteInput[]
    createMany?: EvaluacionCreateManyDocenteInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutDocenteInput | EvaluacionUpdateWithWhereUniqueWithoutDocenteInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutDocenteInput | EvaluacionUpdateManyWithWhereWithoutDocenteInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type SuscripcionUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<SuscripcionCreateWithoutUsuarioInput, SuscripcionUncheckedCreateWithoutUsuarioInput> | SuscripcionCreateWithoutUsuarioInput[] | SuscripcionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SuscripcionCreateOrConnectWithoutUsuarioInput | SuscripcionCreateOrConnectWithoutUsuarioInput[]
    upsert?: SuscripcionUpsertWithWhereUniqueWithoutUsuarioInput | SuscripcionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: SuscripcionCreateManyUsuarioInputEnvelope
    set?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    disconnect?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    delete?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    connect?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    update?: SuscripcionUpdateWithWhereUniqueWithoutUsuarioInput | SuscripcionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: SuscripcionUpdateManyWithWhereWithoutUsuarioInput | SuscripcionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: SuscripcionScalarWhereInput | SuscripcionScalarWhereInput[]
  }

  export type EvaluacionUncheckedUpdateManyWithoutEstudianteNestedInput = {
    create?: XOR<EvaluacionCreateWithoutEstudianteInput, EvaluacionUncheckedCreateWithoutEstudianteInput> | EvaluacionCreateWithoutEstudianteInput[] | EvaluacionUncheckedCreateWithoutEstudianteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutEstudianteInput | EvaluacionCreateOrConnectWithoutEstudianteInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutEstudianteInput | EvaluacionUpsertWithWhereUniqueWithoutEstudianteInput[]
    createMany?: EvaluacionCreateManyEstudianteInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutEstudianteInput | EvaluacionUpdateWithWhereUniqueWithoutEstudianteInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutEstudianteInput | EvaluacionUpdateManyWithWhereWithoutEstudianteInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type EvaluacionUncheckedUpdateManyWithoutDocenteNestedInput = {
    create?: XOR<EvaluacionCreateWithoutDocenteInput, EvaluacionUncheckedCreateWithoutDocenteInput> | EvaluacionCreateWithoutDocenteInput[] | EvaluacionUncheckedCreateWithoutDocenteInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutDocenteInput | EvaluacionCreateOrConnectWithoutDocenteInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutDocenteInput | EvaluacionUpsertWithWhereUniqueWithoutDocenteInput[]
    createMany?: EvaluacionCreateManyDocenteInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutDocenteInput | EvaluacionUpdateWithWhereUniqueWithoutDocenteInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutDocenteInput | EvaluacionUpdateManyWithWhereWithoutDocenteInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type SuscripcionUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<SuscripcionCreateWithoutUsuarioInput, SuscripcionUncheckedCreateWithoutUsuarioInput> | SuscripcionCreateWithoutUsuarioInput[] | SuscripcionUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: SuscripcionCreateOrConnectWithoutUsuarioInput | SuscripcionCreateOrConnectWithoutUsuarioInput[]
    upsert?: SuscripcionUpsertWithWhereUniqueWithoutUsuarioInput | SuscripcionUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: SuscripcionCreateManyUsuarioInputEnvelope
    set?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    disconnect?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    delete?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    connect?: SuscripcionWhereUniqueInput | SuscripcionWhereUniqueInput[]
    update?: SuscripcionUpdateWithWhereUniqueWithoutUsuarioInput | SuscripcionUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: SuscripcionUpdateManyWithWhereWithoutUsuarioInput | SuscripcionUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: SuscripcionScalarWhereInput | SuscripcionScalarWhereInput[]
  }

  export type EvaluacionCreateNestedManyWithoutCompetenciaInput = {
    create?: XOR<EvaluacionCreateWithoutCompetenciaInput, EvaluacionUncheckedCreateWithoutCompetenciaInput> | EvaluacionCreateWithoutCompetenciaInput[] | EvaluacionUncheckedCreateWithoutCompetenciaInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutCompetenciaInput | EvaluacionCreateOrConnectWithoutCompetenciaInput[]
    createMany?: EvaluacionCreateManyCompetenciaInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type EvaluacionUncheckedCreateNestedManyWithoutCompetenciaInput = {
    create?: XOR<EvaluacionCreateWithoutCompetenciaInput, EvaluacionUncheckedCreateWithoutCompetenciaInput> | EvaluacionCreateWithoutCompetenciaInput[] | EvaluacionUncheckedCreateWithoutCompetenciaInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutCompetenciaInput | EvaluacionCreateOrConnectWithoutCompetenciaInput[]
    createMany?: EvaluacionCreateManyCompetenciaInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type EvaluacionUpdateManyWithoutCompetenciaNestedInput = {
    create?: XOR<EvaluacionCreateWithoutCompetenciaInput, EvaluacionUncheckedCreateWithoutCompetenciaInput> | EvaluacionCreateWithoutCompetenciaInput[] | EvaluacionUncheckedCreateWithoutCompetenciaInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutCompetenciaInput | EvaluacionCreateOrConnectWithoutCompetenciaInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutCompetenciaInput | EvaluacionUpsertWithWhereUniqueWithoutCompetenciaInput[]
    createMany?: EvaluacionCreateManyCompetenciaInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutCompetenciaInput | EvaluacionUpdateWithWhereUniqueWithoutCompetenciaInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutCompetenciaInput | EvaluacionUpdateManyWithWhereWithoutCompetenciaInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type EvaluacionUncheckedUpdateManyWithoutCompetenciaNestedInput = {
    create?: XOR<EvaluacionCreateWithoutCompetenciaInput, EvaluacionUncheckedCreateWithoutCompetenciaInput> | EvaluacionCreateWithoutCompetenciaInput[] | EvaluacionUncheckedCreateWithoutCompetenciaInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutCompetenciaInput | EvaluacionCreateOrConnectWithoutCompetenciaInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutCompetenciaInput | EvaluacionUpsertWithWhereUniqueWithoutCompetenciaInput[]
    createMany?: EvaluacionCreateManyCompetenciaInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutCompetenciaInput | EvaluacionUpdateWithWhereUniqueWithoutCompetenciaInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutCompetenciaInput | EvaluacionUpdateManyWithWhereWithoutCompetenciaInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type CentroCreateNestedOneWithoutPeriodosInput = {
    create?: XOR<CentroCreateWithoutPeriodosInput, CentroUncheckedCreateWithoutPeriodosInput>
    connectOrCreate?: CentroCreateOrConnectWithoutPeriodosInput
    connect?: CentroWhereUniqueInput
  }

  export type EvaluacionCreateNestedManyWithoutPeriodoInput = {
    create?: XOR<EvaluacionCreateWithoutPeriodoInput, EvaluacionUncheckedCreateWithoutPeriodoInput> | EvaluacionCreateWithoutPeriodoInput[] | EvaluacionUncheckedCreateWithoutPeriodoInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutPeriodoInput | EvaluacionCreateOrConnectWithoutPeriodoInput[]
    createMany?: EvaluacionCreateManyPeriodoInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type EvaluacionUncheckedCreateNestedManyWithoutPeriodoInput = {
    create?: XOR<EvaluacionCreateWithoutPeriodoInput, EvaluacionUncheckedCreateWithoutPeriodoInput> | EvaluacionCreateWithoutPeriodoInput[] | EvaluacionUncheckedCreateWithoutPeriodoInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutPeriodoInput | EvaluacionCreateOrConnectWithoutPeriodoInput[]
    createMany?: EvaluacionCreateManyPeriodoInputEnvelope
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
  }

  export type CentroUpdateOneRequiredWithoutPeriodosNestedInput = {
    create?: XOR<CentroCreateWithoutPeriodosInput, CentroUncheckedCreateWithoutPeriodosInput>
    connectOrCreate?: CentroCreateOrConnectWithoutPeriodosInput
    upsert?: CentroUpsertWithoutPeriodosInput
    connect?: CentroWhereUniqueInput
    update?: XOR<XOR<CentroUpdateToOneWithWhereWithoutPeriodosInput, CentroUpdateWithoutPeriodosInput>, CentroUncheckedUpdateWithoutPeriodosInput>
  }

  export type EvaluacionUpdateManyWithoutPeriodoNestedInput = {
    create?: XOR<EvaluacionCreateWithoutPeriodoInput, EvaluacionUncheckedCreateWithoutPeriodoInput> | EvaluacionCreateWithoutPeriodoInput[] | EvaluacionUncheckedCreateWithoutPeriodoInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutPeriodoInput | EvaluacionCreateOrConnectWithoutPeriodoInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutPeriodoInput | EvaluacionUpsertWithWhereUniqueWithoutPeriodoInput[]
    createMany?: EvaluacionCreateManyPeriodoInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutPeriodoInput | EvaluacionUpdateWithWhereUniqueWithoutPeriodoInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutPeriodoInput | EvaluacionUpdateManyWithWhereWithoutPeriodoInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type EvaluacionUncheckedUpdateManyWithoutPeriodoNestedInput = {
    create?: XOR<EvaluacionCreateWithoutPeriodoInput, EvaluacionUncheckedCreateWithoutPeriodoInput> | EvaluacionCreateWithoutPeriodoInput[] | EvaluacionUncheckedCreateWithoutPeriodoInput[]
    connectOrCreate?: EvaluacionCreateOrConnectWithoutPeriodoInput | EvaluacionCreateOrConnectWithoutPeriodoInput[]
    upsert?: EvaluacionUpsertWithWhereUniqueWithoutPeriodoInput | EvaluacionUpsertWithWhereUniqueWithoutPeriodoInput[]
    createMany?: EvaluacionCreateManyPeriodoInputEnvelope
    set?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    disconnect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    delete?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    connect?: EvaluacionWhereUniqueInput | EvaluacionWhereUniqueInput[]
    update?: EvaluacionUpdateWithWhereUniqueWithoutPeriodoInput | EvaluacionUpdateWithWhereUniqueWithoutPeriodoInput[]
    updateMany?: EvaluacionUpdateManyWithWhereWithoutPeriodoInput | EvaluacionUpdateManyWithWhereWithoutPeriodoInput[]
    deleteMany?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutEvaluacionesEstudianteInput = {
    create?: XOR<UsuarioCreateWithoutEvaluacionesEstudianteInput, UsuarioUncheckedCreateWithoutEvaluacionesEstudianteInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEvaluacionesEstudianteInput
    connect?: UsuarioWhereUniqueInput
  }

  export type CompetenciaCreateNestedOneWithoutEvaluacionesInput = {
    create?: XOR<CompetenciaCreateWithoutEvaluacionesInput, CompetenciaUncheckedCreateWithoutEvaluacionesInput>
    connectOrCreate?: CompetenciaCreateOrConnectWithoutEvaluacionesInput
    connect?: CompetenciaWhereUniqueInput
  }

  export type PeriodoCreateNestedOneWithoutEvaluacionesInput = {
    create?: XOR<PeriodoCreateWithoutEvaluacionesInput, PeriodoUncheckedCreateWithoutEvaluacionesInput>
    connectOrCreate?: PeriodoCreateOrConnectWithoutEvaluacionesInput
    connect?: PeriodoWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutEvaluacionesDocenteInput = {
    create?: XOR<UsuarioCreateWithoutEvaluacionesDocenteInput, UsuarioUncheckedCreateWithoutEvaluacionesDocenteInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEvaluacionesDocenteInput
    connect?: UsuarioWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UsuarioUpdateOneRequiredWithoutEvaluacionesEstudianteNestedInput = {
    create?: XOR<UsuarioCreateWithoutEvaluacionesEstudianteInput, UsuarioUncheckedCreateWithoutEvaluacionesEstudianteInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEvaluacionesEstudianteInput
    upsert?: UsuarioUpsertWithoutEvaluacionesEstudianteInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutEvaluacionesEstudianteInput, UsuarioUpdateWithoutEvaluacionesEstudianteInput>, UsuarioUncheckedUpdateWithoutEvaluacionesEstudianteInput>
  }

  export type CompetenciaUpdateOneRequiredWithoutEvaluacionesNestedInput = {
    create?: XOR<CompetenciaCreateWithoutEvaluacionesInput, CompetenciaUncheckedCreateWithoutEvaluacionesInput>
    connectOrCreate?: CompetenciaCreateOrConnectWithoutEvaluacionesInput
    upsert?: CompetenciaUpsertWithoutEvaluacionesInput
    connect?: CompetenciaWhereUniqueInput
    update?: XOR<XOR<CompetenciaUpdateToOneWithWhereWithoutEvaluacionesInput, CompetenciaUpdateWithoutEvaluacionesInput>, CompetenciaUncheckedUpdateWithoutEvaluacionesInput>
  }

  export type PeriodoUpdateOneRequiredWithoutEvaluacionesNestedInput = {
    create?: XOR<PeriodoCreateWithoutEvaluacionesInput, PeriodoUncheckedCreateWithoutEvaluacionesInput>
    connectOrCreate?: PeriodoCreateOrConnectWithoutEvaluacionesInput
    upsert?: PeriodoUpsertWithoutEvaluacionesInput
    connect?: PeriodoWhereUniqueInput
    update?: XOR<XOR<PeriodoUpdateToOneWithWhereWithoutEvaluacionesInput, PeriodoUpdateWithoutEvaluacionesInput>, PeriodoUncheckedUpdateWithoutEvaluacionesInput>
  }

  export type UsuarioUpdateOneRequiredWithoutEvaluacionesDocenteNestedInput = {
    create?: XOR<UsuarioCreateWithoutEvaluacionesDocenteInput, UsuarioUncheckedCreateWithoutEvaluacionesDocenteInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutEvaluacionesDocenteInput
    upsert?: UsuarioUpsertWithoutEvaluacionesDocenteInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutEvaluacionesDocenteInput, UsuarioUpdateWithoutEvaluacionesDocenteInput>, UsuarioUncheckedUpdateWithoutEvaluacionesDocenteInput>
  }

  export type UsuarioCreateNestedOneWithoutSuscripcionesInput = {
    create?: XOR<UsuarioCreateWithoutSuscripcionesInput, UsuarioUncheckedCreateWithoutSuscripcionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSuscripcionesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type PagoCreateNestedManyWithoutSuscripcionInput = {
    create?: XOR<PagoCreateWithoutSuscripcionInput, PagoUncheckedCreateWithoutSuscripcionInput> | PagoCreateWithoutSuscripcionInput[] | PagoUncheckedCreateWithoutSuscripcionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutSuscripcionInput | PagoCreateOrConnectWithoutSuscripcionInput[]
    createMany?: PagoCreateManySuscripcionInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type PagoUncheckedCreateNestedManyWithoutSuscripcionInput = {
    create?: XOR<PagoCreateWithoutSuscripcionInput, PagoUncheckedCreateWithoutSuscripcionInput> | PagoCreateWithoutSuscripcionInput[] | PagoUncheckedCreateWithoutSuscripcionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutSuscripcionInput | PagoCreateOrConnectWithoutSuscripcionInput[]
    createMany?: PagoCreateManySuscripcionInputEnvelope
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UsuarioUpdateOneRequiredWithoutSuscripcionesNestedInput = {
    create?: XOR<UsuarioCreateWithoutSuscripcionesInput, UsuarioUncheckedCreateWithoutSuscripcionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSuscripcionesInput
    upsert?: UsuarioUpsertWithoutSuscripcionesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutSuscripcionesInput, UsuarioUpdateWithoutSuscripcionesInput>, UsuarioUncheckedUpdateWithoutSuscripcionesInput>
  }

  export type PagoUpdateManyWithoutSuscripcionNestedInput = {
    create?: XOR<PagoCreateWithoutSuscripcionInput, PagoUncheckedCreateWithoutSuscripcionInput> | PagoCreateWithoutSuscripcionInput[] | PagoUncheckedCreateWithoutSuscripcionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutSuscripcionInput | PagoCreateOrConnectWithoutSuscripcionInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutSuscripcionInput | PagoUpsertWithWhereUniqueWithoutSuscripcionInput[]
    createMany?: PagoCreateManySuscripcionInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutSuscripcionInput | PagoUpdateWithWhereUniqueWithoutSuscripcionInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutSuscripcionInput | PagoUpdateManyWithWhereWithoutSuscripcionInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type PagoUncheckedUpdateManyWithoutSuscripcionNestedInput = {
    create?: XOR<PagoCreateWithoutSuscripcionInput, PagoUncheckedCreateWithoutSuscripcionInput> | PagoCreateWithoutSuscripcionInput[] | PagoUncheckedCreateWithoutSuscripcionInput[]
    connectOrCreate?: PagoCreateOrConnectWithoutSuscripcionInput | PagoCreateOrConnectWithoutSuscripcionInput[]
    upsert?: PagoUpsertWithWhereUniqueWithoutSuscripcionInput | PagoUpsertWithWhereUniqueWithoutSuscripcionInput[]
    createMany?: PagoCreateManySuscripcionInputEnvelope
    set?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    disconnect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    delete?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    connect?: PagoWhereUniqueInput | PagoWhereUniqueInput[]
    update?: PagoUpdateWithWhereUniqueWithoutSuscripcionInput | PagoUpdateWithWhereUniqueWithoutSuscripcionInput[]
    updateMany?: PagoUpdateManyWithWhereWithoutSuscripcionInput | PagoUpdateManyWithWhereWithoutSuscripcionInput[]
    deleteMany?: PagoScalarWhereInput | PagoScalarWhereInput[]
  }

  export type SuscripcionCreateNestedOneWithoutPagosInput = {
    create?: XOR<SuscripcionCreateWithoutPagosInput, SuscripcionUncheckedCreateWithoutPagosInput>
    connectOrCreate?: SuscripcionCreateOrConnectWithoutPagosInput
    connect?: SuscripcionWhereUniqueInput
  }

  export type SuscripcionUpdateOneRequiredWithoutPagosNestedInput = {
    create?: XOR<SuscripcionCreateWithoutPagosInput, SuscripcionUncheckedCreateWithoutPagosInput>
    connectOrCreate?: SuscripcionCreateOrConnectWithoutPagosInput
    upsert?: SuscripcionUpsertWithoutPagosInput
    connect?: SuscripcionWhereUniqueInput
    update?: XOR<XOR<SuscripcionUpdateToOneWithWhereWithoutPagosInput, SuscripcionUpdateWithoutPagosInput>, SuscripcionUncheckedUpdateWithoutPagosInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UsuarioCreateWithoutCentroInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluacionesEstudiante?: EvaluacionCreateNestedManyWithoutEstudianteInput
    evaluacionesDocente?: EvaluacionCreateNestedManyWithoutDocenteInput
    suscripciones?: SuscripcionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutCentroInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluacionesEstudiante?: EvaluacionUncheckedCreateNestedManyWithoutEstudianteInput
    evaluacionesDocente?: EvaluacionUncheckedCreateNestedManyWithoutDocenteInput
    suscripciones?: SuscripcionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutCentroInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCentroInput, UsuarioUncheckedCreateWithoutCentroInput>
  }

  export type UsuarioCreateManyCentroInputEnvelope = {
    data: UsuarioCreateManyCentroInput | UsuarioCreateManyCentroInput[]
    skipDuplicates?: boolean
  }

  export type PeriodoCreateWithoutCentroInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    activo?: boolean
    createdAt?: Date | string
    evaluaciones?: EvaluacionCreateNestedManyWithoutPeriodoInput
  }

  export type PeriodoUncheckedCreateWithoutCentroInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    activo?: boolean
    createdAt?: Date | string
    evaluaciones?: EvaluacionUncheckedCreateNestedManyWithoutPeriodoInput
  }

  export type PeriodoCreateOrConnectWithoutCentroInput = {
    where: PeriodoWhereUniqueInput
    create: XOR<PeriodoCreateWithoutCentroInput, PeriodoUncheckedCreateWithoutCentroInput>
  }

  export type PeriodoCreateManyCentroInputEnvelope = {
    data: PeriodoCreateManyCentroInput | PeriodoCreateManyCentroInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithWhereUniqueWithoutCentroInput = {
    where: UsuarioWhereUniqueInput
    update: XOR<UsuarioUpdateWithoutCentroInput, UsuarioUncheckedUpdateWithoutCentroInput>
    create: XOR<UsuarioCreateWithoutCentroInput, UsuarioUncheckedCreateWithoutCentroInput>
  }

  export type UsuarioUpdateWithWhereUniqueWithoutCentroInput = {
    where: UsuarioWhereUniqueInput
    data: XOR<UsuarioUpdateWithoutCentroInput, UsuarioUncheckedUpdateWithoutCentroInput>
  }

  export type UsuarioUpdateManyWithWhereWithoutCentroInput = {
    where: UsuarioScalarWhereInput
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyWithoutCentroInput>
  }

  export type UsuarioScalarWhereInput = {
    AND?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    OR?: UsuarioScalarWhereInput[]
    NOT?: UsuarioScalarWhereInput | UsuarioScalarWhereInput[]
    id?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    email?: StringFilter<"Usuario"> | string
    password?: StringFilter<"Usuario"> | string
    rol?: StringFilter<"Usuario"> | string
    genero?: StringNullableFilter<"Usuario"> | string | null
    grado?: StringNullableFilter<"Usuario"> | string | null
    grados?: StringNullableListFilter<"Usuario">
    niveles?: StringNullableListFilter<"Usuario">
    ciclos?: StringNullableListFilter<"Usuario">
    materias?: StringNullableListFilter<"Usuario">
    categoriaDocente?: StringNullableFilter<"Usuario"> | string | null
    rne?: StringNullableFilter<"Usuario"> | string | null
    activo?: BoolFilter<"Usuario"> | boolean
    createdAt?: DateTimeFilter<"Usuario"> | Date | string
    updatedAt?: DateTimeFilter<"Usuario"> | Date | string
    centroId?: StringNullableFilter<"Usuario"> | string | null
  }

  export type PeriodoUpsertWithWhereUniqueWithoutCentroInput = {
    where: PeriodoWhereUniqueInput
    update: XOR<PeriodoUpdateWithoutCentroInput, PeriodoUncheckedUpdateWithoutCentroInput>
    create: XOR<PeriodoCreateWithoutCentroInput, PeriodoUncheckedCreateWithoutCentroInput>
  }

  export type PeriodoUpdateWithWhereUniqueWithoutCentroInput = {
    where: PeriodoWhereUniqueInput
    data: XOR<PeriodoUpdateWithoutCentroInput, PeriodoUncheckedUpdateWithoutCentroInput>
  }

  export type PeriodoUpdateManyWithWhereWithoutCentroInput = {
    where: PeriodoScalarWhereInput
    data: XOR<PeriodoUpdateManyMutationInput, PeriodoUncheckedUpdateManyWithoutCentroInput>
  }

  export type PeriodoScalarWhereInput = {
    AND?: PeriodoScalarWhereInput | PeriodoScalarWhereInput[]
    OR?: PeriodoScalarWhereInput[]
    NOT?: PeriodoScalarWhereInput | PeriodoScalarWhereInput[]
    id?: StringFilter<"Periodo"> | string
    nombre?: StringFilter<"Periodo"> | string
    fechaInicio?: DateTimeFilter<"Periodo"> | Date | string
    fechaFin?: DateTimeFilter<"Periodo"> | Date | string
    centroId?: StringFilter<"Periodo"> | string
    activo?: BoolFilter<"Periodo"> | boolean
    createdAt?: DateTimeFilter<"Periodo"> | Date | string
  }

  export type CentroCreateWithoutUsuariosInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    periodos?: PeriodoCreateNestedManyWithoutCentroInput
  }

  export type CentroUncheckedCreateWithoutUsuariosInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    periodos?: PeriodoUncheckedCreateNestedManyWithoutCentroInput
  }

  export type CentroCreateOrConnectWithoutUsuariosInput = {
    where: CentroWhereUniqueInput
    create: XOR<CentroCreateWithoutUsuariosInput, CentroUncheckedCreateWithoutUsuariosInput>
  }

  export type EvaluacionCreateWithoutEstudianteInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    competencia: CompetenciaCreateNestedOneWithoutEvaluacionesInput
    periodo: PeriodoCreateNestedOneWithoutEvaluacionesInput
    docente: UsuarioCreateNestedOneWithoutEvaluacionesDocenteInput
  }

  export type EvaluacionUncheckedCreateWithoutEstudianteInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    competenciaId: string
    periodoId: string
    docenteId: string
  }

  export type EvaluacionCreateOrConnectWithoutEstudianteInput = {
    where: EvaluacionWhereUniqueInput
    create: XOR<EvaluacionCreateWithoutEstudianteInput, EvaluacionUncheckedCreateWithoutEstudianteInput>
  }

  export type EvaluacionCreateManyEstudianteInputEnvelope = {
    data: EvaluacionCreateManyEstudianteInput | EvaluacionCreateManyEstudianteInput[]
    skipDuplicates?: boolean
  }

  export type EvaluacionCreateWithoutDocenteInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudiante: UsuarioCreateNestedOneWithoutEvaluacionesEstudianteInput
    competencia: CompetenciaCreateNestedOneWithoutEvaluacionesInput
    periodo: PeriodoCreateNestedOneWithoutEvaluacionesInput
  }

  export type EvaluacionUncheckedCreateWithoutDocenteInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    competenciaId: string
    periodoId: string
  }

  export type EvaluacionCreateOrConnectWithoutDocenteInput = {
    where: EvaluacionWhereUniqueInput
    create: XOR<EvaluacionCreateWithoutDocenteInput, EvaluacionUncheckedCreateWithoutDocenteInput>
  }

  export type EvaluacionCreateManyDocenteInputEnvelope = {
    data: EvaluacionCreateManyDocenteInput | EvaluacionCreateManyDocenteInput[]
    skipDuplicates?: boolean
  }

  export type SuscripcionCreateWithoutUsuarioInput = {
    id?: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pagos?: PagoCreateNestedManyWithoutSuscripcionInput
  }

  export type SuscripcionUncheckedCreateWithoutUsuarioInput = {
    id?: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pagos?: PagoUncheckedCreateNestedManyWithoutSuscripcionInput
  }

  export type SuscripcionCreateOrConnectWithoutUsuarioInput = {
    where: SuscripcionWhereUniqueInput
    create: XOR<SuscripcionCreateWithoutUsuarioInput, SuscripcionUncheckedCreateWithoutUsuarioInput>
  }

  export type SuscripcionCreateManyUsuarioInputEnvelope = {
    data: SuscripcionCreateManyUsuarioInput | SuscripcionCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type CentroUpsertWithoutUsuariosInput = {
    update: XOR<CentroUpdateWithoutUsuariosInput, CentroUncheckedUpdateWithoutUsuariosInput>
    create: XOR<CentroCreateWithoutUsuariosInput, CentroUncheckedCreateWithoutUsuariosInput>
    where?: CentroWhereInput
  }

  export type CentroUpdateToOneWithWhereWithoutUsuariosInput = {
    where?: CentroWhereInput
    data: XOR<CentroUpdateWithoutUsuariosInput, CentroUncheckedUpdateWithoutUsuariosInput>
  }

  export type CentroUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    periodos?: PeriodoUpdateManyWithoutCentroNestedInput
  }

  export type CentroUncheckedUpdateWithoutUsuariosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    periodos?: PeriodoUncheckedUpdateManyWithoutCentroNestedInput
  }

  export type EvaluacionUpsertWithWhereUniqueWithoutEstudianteInput = {
    where: EvaluacionWhereUniqueInput
    update: XOR<EvaluacionUpdateWithoutEstudianteInput, EvaluacionUncheckedUpdateWithoutEstudianteInput>
    create: XOR<EvaluacionCreateWithoutEstudianteInput, EvaluacionUncheckedCreateWithoutEstudianteInput>
  }

  export type EvaluacionUpdateWithWhereUniqueWithoutEstudianteInput = {
    where: EvaluacionWhereUniqueInput
    data: XOR<EvaluacionUpdateWithoutEstudianteInput, EvaluacionUncheckedUpdateWithoutEstudianteInput>
  }

  export type EvaluacionUpdateManyWithWhereWithoutEstudianteInput = {
    where: EvaluacionScalarWhereInput
    data: XOR<EvaluacionUpdateManyMutationInput, EvaluacionUncheckedUpdateManyWithoutEstudianteInput>
  }

  export type EvaluacionScalarWhereInput = {
    AND?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
    OR?: EvaluacionScalarWhereInput[]
    NOT?: EvaluacionScalarWhereInput | EvaluacionScalarWhereInput[]
    id?: StringFilter<"Evaluacion"> | string
    nota?: FloatFilter<"Evaluacion"> | number
    materia?: StringNullableFilter<"Evaluacion"> | string | null
    observaciones?: StringNullableFilter<"Evaluacion"> | string | null
    createdAt?: DateTimeFilter<"Evaluacion"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluacion"> | Date | string
    estudianteId?: StringFilter<"Evaluacion"> | string
    competenciaId?: StringFilter<"Evaluacion"> | string
    periodoId?: StringFilter<"Evaluacion"> | string
    docenteId?: StringFilter<"Evaluacion"> | string
  }

  export type EvaluacionUpsertWithWhereUniqueWithoutDocenteInput = {
    where: EvaluacionWhereUniqueInput
    update: XOR<EvaluacionUpdateWithoutDocenteInput, EvaluacionUncheckedUpdateWithoutDocenteInput>
    create: XOR<EvaluacionCreateWithoutDocenteInput, EvaluacionUncheckedCreateWithoutDocenteInput>
  }

  export type EvaluacionUpdateWithWhereUniqueWithoutDocenteInput = {
    where: EvaluacionWhereUniqueInput
    data: XOR<EvaluacionUpdateWithoutDocenteInput, EvaluacionUncheckedUpdateWithoutDocenteInput>
  }

  export type EvaluacionUpdateManyWithWhereWithoutDocenteInput = {
    where: EvaluacionScalarWhereInput
    data: XOR<EvaluacionUpdateManyMutationInput, EvaluacionUncheckedUpdateManyWithoutDocenteInput>
  }

  export type SuscripcionUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: SuscripcionWhereUniqueInput
    update: XOR<SuscripcionUpdateWithoutUsuarioInput, SuscripcionUncheckedUpdateWithoutUsuarioInput>
    create: XOR<SuscripcionCreateWithoutUsuarioInput, SuscripcionUncheckedCreateWithoutUsuarioInput>
  }

  export type SuscripcionUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: SuscripcionWhereUniqueInput
    data: XOR<SuscripcionUpdateWithoutUsuarioInput, SuscripcionUncheckedUpdateWithoutUsuarioInput>
  }

  export type SuscripcionUpdateManyWithWhereWithoutUsuarioInput = {
    where: SuscripcionScalarWhereInput
    data: XOR<SuscripcionUpdateManyMutationInput, SuscripcionUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type SuscripcionScalarWhereInput = {
    AND?: SuscripcionScalarWhereInput | SuscripcionScalarWhereInput[]
    OR?: SuscripcionScalarWhereInput[]
    NOT?: SuscripcionScalarWhereInput | SuscripcionScalarWhereInput[]
    id?: StringFilter<"Suscripcion"> | string
    usuarioId?: StringFilter<"Suscripcion"> | string
    plan?: StringFilter<"Suscripcion"> | string
    estado?: StringFilter<"Suscripcion"> | string
    lemonCustomerId?: StringNullableFilter<"Suscripcion"> | string | null
    lemonSubscriptionId?: StringNullableFilter<"Suscripcion"> | string | null
    lemonVariantId?: StringNullableFilter<"Suscripcion"> | string | null
    fechaInicio?: DateTimeNullableFilter<"Suscripcion"> | Date | string | null
    fechaFin?: DateTimeNullableFilter<"Suscripcion"> | Date | string | null
    createdAt?: DateTimeFilter<"Suscripcion"> | Date | string
    updatedAt?: DateTimeFilter<"Suscripcion"> | Date | string
  }

  export type EvaluacionCreateWithoutCompetenciaInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudiante: UsuarioCreateNestedOneWithoutEvaluacionesEstudianteInput
    periodo: PeriodoCreateNestedOneWithoutEvaluacionesInput
    docente: UsuarioCreateNestedOneWithoutEvaluacionesDocenteInput
  }

  export type EvaluacionUncheckedCreateWithoutCompetenciaInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    periodoId: string
    docenteId: string
  }

  export type EvaluacionCreateOrConnectWithoutCompetenciaInput = {
    where: EvaluacionWhereUniqueInput
    create: XOR<EvaluacionCreateWithoutCompetenciaInput, EvaluacionUncheckedCreateWithoutCompetenciaInput>
  }

  export type EvaluacionCreateManyCompetenciaInputEnvelope = {
    data: EvaluacionCreateManyCompetenciaInput | EvaluacionCreateManyCompetenciaInput[]
    skipDuplicates?: boolean
  }

  export type EvaluacionUpsertWithWhereUniqueWithoutCompetenciaInput = {
    where: EvaluacionWhereUniqueInput
    update: XOR<EvaluacionUpdateWithoutCompetenciaInput, EvaluacionUncheckedUpdateWithoutCompetenciaInput>
    create: XOR<EvaluacionCreateWithoutCompetenciaInput, EvaluacionUncheckedCreateWithoutCompetenciaInput>
  }

  export type EvaluacionUpdateWithWhereUniqueWithoutCompetenciaInput = {
    where: EvaluacionWhereUniqueInput
    data: XOR<EvaluacionUpdateWithoutCompetenciaInput, EvaluacionUncheckedUpdateWithoutCompetenciaInput>
  }

  export type EvaluacionUpdateManyWithWhereWithoutCompetenciaInput = {
    where: EvaluacionScalarWhereInput
    data: XOR<EvaluacionUpdateManyMutationInput, EvaluacionUncheckedUpdateManyWithoutCompetenciaInput>
  }

  export type CentroCreateWithoutPeriodosInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioCreateNestedManyWithoutCentroInput
  }

  export type CentroUncheckedCreateWithoutPeriodosInput = {
    id?: string
    nombre: string
    codigo: string
    logo?: string | null
    plan?: string
    maxDocentes?: number
    maxEstudiantes?: number
    tipo?: string
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usuarios?: UsuarioUncheckedCreateNestedManyWithoutCentroInput
  }

  export type CentroCreateOrConnectWithoutPeriodosInput = {
    where: CentroWhereUniqueInput
    create: XOR<CentroCreateWithoutPeriodosInput, CentroUncheckedCreateWithoutPeriodosInput>
  }

  export type EvaluacionCreateWithoutPeriodoInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudiante: UsuarioCreateNestedOneWithoutEvaluacionesEstudianteInput
    competencia: CompetenciaCreateNestedOneWithoutEvaluacionesInput
    docente: UsuarioCreateNestedOneWithoutEvaluacionesDocenteInput
  }

  export type EvaluacionUncheckedCreateWithoutPeriodoInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    competenciaId: string
    docenteId: string
  }

  export type EvaluacionCreateOrConnectWithoutPeriodoInput = {
    where: EvaluacionWhereUniqueInput
    create: XOR<EvaluacionCreateWithoutPeriodoInput, EvaluacionUncheckedCreateWithoutPeriodoInput>
  }

  export type EvaluacionCreateManyPeriodoInputEnvelope = {
    data: EvaluacionCreateManyPeriodoInput | EvaluacionCreateManyPeriodoInput[]
    skipDuplicates?: boolean
  }

  export type CentroUpsertWithoutPeriodosInput = {
    update: XOR<CentroUpdateWithoutPeriodosInput, CentroUncheckedUpdateWithoutPeriodosInput>
    create: XOR<CentroCreateWithoutPeriodosInput, CentroUncheckedCreateWithoutPeriodosInput>
    where?: CentroWhereInput
  }

  export type CentroUpdateToOneWithWhereWithoutPeriodosInput = {
    where?: CentroWhereInput
    data: XOR<CentroUpdateWithoutPeriodosInput, CentroUncheckedUpdateWithoutPeriodosInput>
  }

  export type CentroUpdateWithoutPeriodosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUpdateManyWithoutCentroNestedInput
  }

  export type CentroUncheckedUpdateWithoutPeriodosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: StringFieldUpdateOperationsInput | string
    maxDocentes?: IntFieldUpdateOperationsInput | number
    maxEstudiantes?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarios?: UsuarioUncheckedUpdateManyWithoutCentroNestedInput
  }

  export type EvaluacionUpsertWithWhereUniqueWithoutPeriodoInput = {
    where: EvaluacionWhereUniqueInput
    update: XOR<EvaluacionUpdateWithoutPeriodoInput, EvaluacionUncheckedUpdateWithoutPeriodoInput>
    create: XOR<EvaluacionCreateWithoutPeriodoInput, EvaluacionUncheckedCreateWithoutPeriodoInput>
  }

  export type EvaluacionUpdateWithWhereUniqueWithoutPeriodoInput = {
    where: EvaluacionWhereUniqueInput
    data: XOR<EvaluacionUpdateWithoutPeriodoInput, EvaluacionUncheckedUpdateWithoutPeriodoInput>
  }

  export type EvaluacionUpdateManyWithWhereWithoutPeriodoInput = {
    where: EvaluacionScalarWhereInput
    data: XOR<EvaluacionUpdateManyMutationInput, EvaluacionUncheckedUpdateManyWithoutPeriodoInput>
  }

  export type UsuarioCreateWithoutEvaluacionesEstudianteInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centro?: CentroCreateNestedOneWithoutUsuariosInput
    evaluacionesDocente?: EvaluacionCreateNestedManyWithoutDocenteInput
    suscripciones?: SuscripcionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutEvaluacionesEstudianteInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centroId?: string | null
    evaluacionesDocente?: EvaluacionUncheckedCreateNestedManyWithoutDocenteInput
    suscripciones?: SuscripcionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutEvaluacionesEstudianteInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutEvaluacionesEstudianteInput, UsuarioUncheckedCreateWithoutEvaluacionesEstudianteInput>
  }

  export type CompetenciaCreateWithoutEvaluacionesInput = {
    id?: string
    nombre: string
    orden: number
    createdAt?: Date | string
  }

  export type CompetenciaUncheckedCreateWithoutEvaluacionesInput = {
    id?: string
    nombre: string
    orden: number
    createdAt?: Date | string
  }

  export type CompetenciaCreateOrConnectWithoutEvaluacionesInput = {
    where: CompetenciaWhereUniqueInput
    create: XOR<CompetenciaCreateWithoutEvaluacionesInput, CompetenciaUncheckedCreateWithoutEvaluacionesInput>
  }

  export type PeriodoCreateWithoutEvaluacionesInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    activo?: boolean
    createdAt?: Date | string
    centro: CentroCreateNestedOneWithoutPeriodosInput
  }

  export type PeriodoUncheckedCreateWithoutEvaluacionesInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    centroId: string
    activo?: boolean
    createdAt?: Date | string
  }

  export type PeriodoCreateOrConnectWithoutEvaluacionesInput = {
    where: PeriodoWhereUniqueInput
    create: XOR<PeriodoCreateWithoutEvaluacionesInput, PeriodoUncheckedCreateWithoutEvaluacionesInput>
  }

  export type UsuarioCreateWithoutEvaluacionesDocenteInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centro?: CentroCreateNestedOneWithoutUsuariosInput
    evaluacionesEstudiante?: EvaluacionCreateNestedManyWithoutEstudianteInput
    suscripciones?: SuscripcionCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioUncheckedCreateWithoutEvaluacionesDocenteInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centroId?: string | null
    evaluacionesEstudiante?: EvaluacionUncheckedCreateNestedManyWithoutEstudianteInput
    suscripciones?: SuscripcionUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type UsuarioCreateOrConnectWithoutEvaluacionesDocenteInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutEvaluacionesDocenteInput, UsuarioUncheckedCreateWithoutEvaluacionesDocenteInput>
  }

  export type UsuarioUpsertWithoutEvaluacionesEstudianteInput = {
    update: XOR<UsuarioUpdateWithoutEvaluacionesEstudianteInput, UsuarioUncheckedUpdateWithoutEvaluacionesEstudianteInput>
    create: XOR<UsuarioCreateWithoutEvaluacionesEstudianteInput, UsuarioUncheckedCreateWithoutEvaluacionesEstudianteInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutEvaluacionesEstudianteInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutEvaluacionesEstudianteInput, UsuarioUncheckedUpdateWithoutEvaluacionesEstudianteInput>
  }

  export type UsuarioUpdateWithoutEvaluacionesEstudianteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centro?: CentroUpdateOneWithoutUsuariosNestedInput
    evaluacionesDocente?: EvaluacionUpdateManyWithoutDocenteNestedInput
    suscripciones?: SuscripcionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutEvaluacionesEstudianteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: NullableStringFieldUpdateOperationsInput | string | null
    evaluacionesDocente?: EvaluacionUncheckedUpdateManyWithoutDocenteNestedInput
    suscripciones?: SuscripcionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type CompetenciaUpsertWithoutEvaluacionesInput = {
    update: XOR<CompetenciaUpdateWithoutEvaluacionesInput, CompetenciaUncheckedUpdateWithoutEvaluacionesInput>
    create: XOR<CompetenciaCreateWithoutEvaluacionesInput, CompetenciaUncheckedCreateWithoutEvaluacionesInput>
    where?: CompetenciaWhereInput
  }

  export type CompetenciaUpdateToOneWithWhereWithoutEvaluacionesInput = {
    where?: CompetenciaWhereInput
    data: XOR<CompetenciaUpdateWithoutEvaluacionesInput, CompetenciaUncheckedUpdateWithoutEvaluacionesInput>
  }

  export type CompetenciaUpdateWithoutEvaluacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetenciaUncheckedUpdateWithoutEvaluacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    orden?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodoUpsertWithoutEvaluacionesInput = {
    update: XOR<PeriodoUpdateWithoutEvaluacionesInput, PeriodoUncheckedUpdateWithoutEvaluacionesInput>
    create: XOR<PeriodoCreateWithoutEvaluacionesInput, PeriodoUncheckedCreateWithoutEvaluacionesInput>
    where?: PeriodoWhereInput
  }

  export type PeriodoUpdateToOneWithWhereWithoutEvaluacionesInput = {
    where?: PeriodoWhereInput
    data: XOR<PeriodoUpdateWithoutEvaluacionesInput, PeriodoUncheckedUpdateWithoutEvaluacionesInput>
  }

  export type PeriodoUpdateWithoutEvaluacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centro?: CentroUpdateOneRequiredWithoutPeriodosNestedInput
  }

  export type PeriodoUncheckedUpdateWithoutEvaluacionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioUpsertWithoutEvaluacionesDocenteInput = {
    update: XOR<UsuarioUpdateWithoutEvaluacionesDocenteInput, UsuarioUncheckedUpdateWithoutEvaluacionesDocenteInput>
    create: XOR<UsuarioCreateWithoutEvaluacionesDocenteInput, UsuarioUncheckedCreateWithoutEvaluacionesDocenteInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutEvaluacionesDocenteInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutEvaluacionesDocenteInput, UsuarioUncheckedUpdateWithoutEvaluacionesDocenteInput>
  }

  export type UsuarioUpdateWithoutEvaluacionesDocenteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centro?: CentroUpdateOneWithoutUsuariosNestedInput
    evaluacionesEstudiante?: EvaluacionUpdateManyWithoutEstudianteNestedInput
    suscripciones?: SuscripcionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutEvaluacionesDocenteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: NullableStringFieldUpdateOperationsInput | string | null
    evaluacionesEstudiante?: EvaluacionUncheckedUpdateManyWithoutEstudianteNestedInput
    suscripciones?: SuscripcionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioCreateWithoutSuscripcionesInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centro?: CentroCreateNestedOneWithoutUsuariosInput
    evaluacionesEstudiante?: EvaluacionCreateNestedManyWithoutEstudianteInput
    evaluacionesDocente?: EvaluacionCreateNestedManyWithoutDocenteInput
  }

  export type UsuarioUncheckedCreateWithoutSuscripcionesInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    centroId?: string | null
    evaluacionesEstudiante?: EvaluacionUncheckedCreateNestedManyWithoutEstudianteInput
    evaluacionesDocente?: EvaluacionUncheckedCreateNestedManyWithoutDocenteInput
  }

  export type UsuarioCreateOrConnectWithoutSuscripcionesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutSuscripcionesInput, UsuarioUncheckedCreateWithoutSuscripcionesInput>
  }

  export type PagoCreateWithoutSuscripcionInput = {
    id?: string
    monto: number
    moneda?: string
    estado?: string
    lemonOrderId?: string | null
    lemonPaymentId?: string | null
    createdAt?: Date | string
  }

  export type PagoUncheckedCreateWithoutSuscripcionInput = {
    id?: string
    monto: number
    moneda?: string
    estado?: string
    lemonOrderId?: string | null
    lemonPaymentId?: string | null
    createdAt?: Date | string
  }

  export type PagoCreateOrConnectWithoutSuscripcionInput = {
    where: PagoWhereUniqueInput
    create: XOR<PagoCreateWithoutSuscripcionInput, PagoUncheckedCreateWithoutSuscripcionInput>
  }

  export type PagoCreateManySuscripcionInputEnvelope = {
    data: PagoCreateManySuscripcionInput | PagoCreateManySuscripcionInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioUpsertWithoutSuscripcionesInput = {
    update: XOR<UsuarioUpdateWithoutSuscripcionesInput, UsuarioUncheckedUpdateWithoutSuscripcionesInput>
    create: XOR<UsuarioCreateWithoutSuscripcionesInput, UsuarioUncheckedCreateWithoutSuscripcionesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutSuscripcionesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutSuscripcionesInput, UsuarioUncheckedUpdateWithoutSuscripcionesInput>
  }

  export type UsuarioUpdateWithoutSuscripcionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centro?: CentroUpdateOneWithoutUsuariosNestedInput
    evaluacionesEstudiante?: EvaluacionUpdateManyWithoutEstudianteNestedInput
    evaluacionesDocente?: EvaluacionUpdateManyWithoutDocenteNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutSuscripcionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    centroId?: NullableStringFieldUpdateOperationsInput | string | null
    evaluacionesEstudiante?: EvaluacionUncheckedUpdateManyWithoutEstudianteNestedInput
    evaluacionesDocente?: EvaluacionUncheckedUpdateManyWithoutDocenteNestedInput
  }

  export type PagoUpsertWithWhereUniqueWithoutSuscripcionInput = {
    where: PagoWhereUniqueInput
    update: XOR<PagoUpdateWithoutSuscripcionInput, PagoUncheckedUpdateWithoutSuscripcionInput>
    create: XOR<PagoCreateWithoutSuscripcionInput, PagoUncheckedCreateWithoutSuscripcionInput>
  }

  export type PagoUpdateWithWhereUniqueWithoutSuscripcionInput = {
    where: PagoWhereUniqueInput
    data: XOR<PagoUpdateWithoutSuscripcionInput, PagoUncheckedUpdateWithoutSuscripcionInput>
  }

  export type PagoUpdateManyWithWhereWithoutSuscripcionInput = {
    where: PagoScalarWhereInput
    data: XOR<PagoUpdateManyMutationInput, PagoUncheckedUpdateManyWithoutSuscripcionInput>
  }

  export type PagoScalarWhereInput = {
    AND?: PagoScalarWhereInput | PagoScalarWhereInput[]
    OR?: PagoScalarWhereInput[]
    NOT?: PagoScalarWhereInput | PagoScalarWhereInput[]
    id?: StringFilter<"Pago"> | string
    suscripcionId?: StringFilter<"Pago"> | string
    monto?: FloatFilter<"Pago"> | number
    moneda?: StringFilter<"Pago"> | string
    estado?: StringFilter<"Pago"> | string
    lemonOrderId?: StringNullableFilter<"Pago"> | string | null
    lemonPaymentId?: StringNullableFilter<"Pago"> | string | null
    createdAt?: DateTimeFilter<"Pago"> | Date | string
  }

  export type SuscripcionCreateWithoutPagosInput = {
    id?: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    usuario: UsuarioCreateNestedOneWithoutSuscripcionesInput
  }

  export type SuscripcionUncheckedCreateWithoutPagosInput = {
    id?: string
    usuarioId: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuscripcionCreateOrConnectWithoutPagosInput = {
    where: SuscripcionWhereUniqueInput
    create: XOR<SuscripcionCreateWithoutPagosInput, SuscripcionUncheckedCreateWithoutPagosInput>
  }

  export type SuscripcionUpsertWithoutPagosInput = {
    update: XOR<SuscripcionUpdateWithoutPagosInput, SuscripcionUncheckedUpdateWithoutPagosInput>
    create: XOR<SuscripcionCreateWithoutPagosInput, SuscripcionUncheckedCreateWithoutPagosInput>
    where?: SuscripcionWhereInput
  }

  export type SuscripcionUpdateToOneWithWhereWithoutPagosInput = {
    where?: SuscripcionWhereInput
    data: XOR<SuscripcionUpdateWithoutPagosInput, SuscripcionUncheckedUpdateWithoutPagosInput>
  }

  export type SuscripcionUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UsuarioUpdateOneRequiredWithoutSuscripcionesNestedInput
  }

  export type SuscripcionUncheckedUpdateWithoutPagosInput = {
    id?: StringFieldUpdateOperationsInput | string
    usuarioId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateManyCentroInput = {
    id?: string
    nombre: string
    email: string
    password: string
    rol?: string
    genero?: string | null
    grado?: string | null
    grados?: UsuarioCreategradosInput | string[]
    niveles?: UsuarioCreatenivelesInput | string[]
    ciclos?: UsuarioCreateciclosInput | string[]
    materias?: UsuarioCreatemateriasInput | string[]
    categoriaDocente?: string | null
    rne?: string | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PeriodoCreateManyCentroInput = {
    id?: string
    nombre: string
    fechaInicio: Date | string
    fechaFin: Date | string
    activo?: boolean
    createdAt?: Date | string
  }

  export type UsuarioUpdateWithoutCentroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluacionesEstudiante?: EvaluacionUpdateManyWithoutEstudianteNestedInput
    evaluacionesDocente?: EvaluacionUpdateManyWithoutDocenteNestedInput
    suscripciones?: SuscripcionUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCentroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluacionesEstudiante?: EvaluacionUncheckedUpdateManyWithoutEstudianteNestedInput
    evaluacionesDocente?: EvaluacionUncheckedUpdateManyWithoutDocenteNestedInput
    suscripciones?: SuscripcionUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type UsuarioUncheckedUpdateManyWithoutCentroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    genero?: NullableStringFieldUpdateOperationsInput | string | null
    grado?: NullableStringFieldUpdateOperationsInput | string | null
    grados?: UsuarioUpdategradosInput | string[]
    niveles?: UsuarioUpdatenivelesInput | string[]
    ciclos?: UsuarioUpdateciclosInput | string[]
    materias?: UsuarioUpdatemateriasInput | string[]
    categoriaDocente?: NullableStringFieldUpdateOperationsInput | string | null
    rne?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PeriodoUpdateWithoutCentroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluaciones?: EvaluacionUpdateManyWithoutPeriodoNestedInput
  }

  export type PeriodoUncheckedUpdateWithoutCentroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluaciones?: EvaluacionUncheckedUpdateManyWithoutPeriodoNestedInput
  }

  export type PeriodoUncheckedUpdateManyWithoutCentroInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    fechaInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaFin?: DateTimeFieldUpdateOperationsInput | Date | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluacionCreateManyEstudianteInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    competenciaId: string
    periodoId: string
    docenteId: string
  }

  export type EvaluacionCreateManyDocenteInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    competenciaId: string
    periodoId: string
  }

  export type SuscripcionCreateManyUsuarioInput = {
    id?: string
    plan?: string
    estado?: string
    lemonCustomerId?: string | null
    lemonSubscriptionId?: string | null
    lemonVariantId?: string | null
    fechaInicio?: Date | string | null
    fechaFin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluacionUpdateWithoutEstudianteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    competencia?: CompetenciaUpdateOneRequiredWithoutEvaluacionesNestedInput
    periodo?: PeriodoUpdateOneRequiredWithoutEvaluacionesNestedInput
    docente?: UsuarioUpdateOneRequiredWithoutEvaluacionesDocenteNestedInput
  }

  export type EvaluacionUncheckedUpdateWithoutEstudianteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionUncheckedUpdateManyWithoutEstudianteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionUpdateWithoutDocenteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudiante?: UsuarioUpdateOneRequiredWithoutEvaluacionesEstudianteNestedInput
    competencia?: CompetenciaUpdateOneRequiredWithoutEvaluacionesNestedInput
    periodo?: PeriodoUpdateOneRequiredWithoutEvaluacionesNestedInput
  }

  export type EvaluacionUncheckedUpdateWithoutDocenteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionUncheckedUpdateManyWithoutDocenteInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
  }

  export type SuscripcionUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pagos?: PagoUpdateManyWithoutSuscripcionNestedInput
  }

  export type SuscripcionUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pagos?: PagoUncheckedUpdateManyWithoutSuscripcionNestedInput
  }

  export type SuscripcionUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    fechaInicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaFin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluacionCreateManyCompetenciaInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    periodoId: string
    docenteId: string
  }

  export type EvaluacionUpdateWithoutCompetenciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudiante?: UsuarioUpdateOneRequiredWithoutEvaluacionesEstudianteNestedInput
    periodo?: PeriodoUpdateOneRequiredWithoutEvaluacionesNestedInput
    docente?: UsuarioUpdateOneRequiredWithoutEvaluacionesDocenteNestedInput
  }

  export type EvaluacionUncheckedUpdateWithoutCompetenciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionUncheckedUpdateManyWithoutCompetenciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    periodoId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionCreateManyPeriodoInput = {
    id?: string
    nota: number
    materia?: string | null
    observaciones?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    estudianteId: string
    competenciaId: string
    docenteId: string
  }

  export type EvaluacionUpdateWithoutPeriodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudiante?: UsuarioUpdateOneRequiredWithoutEvaluacionesEstudianteNestedInput
    competencia?: CompetenciaUpdateOneRequiredWithoutEvaluacionesNestedInput
    docente?: UsuarioUpdateOneRequiredWithoutEvaluacionesDocenteNestedInput
  }

  export type EvaluacionUncheckedUpdateWithoutPeriodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluacionUncheckedUpdateManyWithoutPeriodoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nota?: FloatFieldUpdateOperationsInput | number
    materia?: NullableStringFieldUpdateOperationsInput | string | null
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    estudianteId?: StringFieldUpdateOperationsInput | string
    competenciaId?: StringFieldUpdateOperationsInput | string
    docenteId?: StringFieldUpdateOperationsInput | string
  }

  export type PagoCreateManySuscripcionInput = {
    id?: string
    monto: number
    moneda?: string
    estado?: string
    lemonOrderId?: string | null
    lemonPaymentId?: string | null
    createdAt?: Date | string
  }

  export type PagoUpdateWithoutSuscripcionInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateWithoutSuscripcionInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PagoUncheckedUpdateManyWithoutSuscripcionInput = {
    id?: StringFieldUpdateOperationsInput | string
    monto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    lemonOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    lemonPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}