import { Database } from '../core/Database'
export enum Comparators {
  EQUALS = '=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUALS = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUALS = '<=',
}

export class QueryBuilder {
  private sql: string = ''

  public select(field: string, ...fields: string[]): QueryBuilder {
    this.sql = 'SELECT ' + Database.escape(field)
    fields.forEach((f) => {
      this.sql += ', ' + Database.escape(f)
    })
    return this
  }

  public from(table: string): QueryBuilder {
    this.sql += ' FROM ' + Database.escape(table)
    return this
  }

  public where(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql +=
      ' WHERE ' +
      Database.escape(field) +
      ' ' +
      comparator +
      ' ' +
      Database.escape(parameter)
    return this
  }

  public and(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql +=
      ' AND ' +
      Database.escape(field) +
      ' ' +
      comparator +
      ' ' +
      Database.escape(parameter)
    return this
  }

  public or(
    field: string,
    comparator: Comparators,
    parameter: string
  ): QueryBuilder {
    this.sql +=
      ' OR ' +
      Database.escape(field) +
      ' ' +
      comparator +
      ' ' +
      Database.escape(parameter)
    return this
  }

  public build(): string {
    return this.sql
  }
}
