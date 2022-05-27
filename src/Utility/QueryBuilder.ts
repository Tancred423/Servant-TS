import { Database } from '../core/Database'
import { StringBuilder } from './StringBuilder'

export enum Comparators {
  EQUALS = '=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUALS = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUALS = '<=',
}

export class QueryBuilder {
  private sql = new StringBuilder()

  public select(field: string, ...fields: string[]): QueryBuilder {
    this.sql.set('SELECT ').append(Database.escape(field))

    fields.forEach((f) => {
      this.sql.append(', ').append(Database.escape(f))
    })

    return this
  }

  public from(table: string): QueryBuilder {
    this.sql.append(' FROM ').append(Database.escape(table))

    return this
  }

  public where(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql
      .append(' WHERE ')
      .append(Database.escape(field))
      .append(' ')
      .append(comparator)
      .append(' ')
      .append(Database.escape(parameter))

    return this
  }

  public and(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql
      .append(' AND ')
      .append(Database.escape(field))
      .append(' ')
      .append(comparator)
      .append(' ')
      .append(Database.escape(parameter))

    return this
  }

  public or(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql
      .append(' OR ')
      .append(Database.escape(field))
      .append(' ')
      .append(comparator)
      .append(' ')
      .append(Database.escape(parameter))

    return this
  }

  public build(): string {
    return this.sql.build()
  }
}
