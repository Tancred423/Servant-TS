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
    this.sql.set('SELECT ').append(Database.escapeBackticks(field))

    fields.forEach((f) => {
      this.sql.append(', ').append(Database.escapeBackticks(f))
    })

    return this
  }

  public from(table: string): QueryBuilder {
    this.sql.append(' FROM ').append(Database.escapeBackticks(table))

    return this
  }

  public where(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql
      .append(' WHERE ')
      .append(Database.escapeBackticks(field))
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
      .append(Database.escapeBackticks(field))
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
      .append(Database.escapeBackticks(field))
      .append(' ')
      .append(comparator)
      .append(' ')
      .append(Database.escape(parameter))

    return this
  }

  public build(): string {
    const sql = this.sql.build()
    console.log(sql)
    return sql
  }
}
