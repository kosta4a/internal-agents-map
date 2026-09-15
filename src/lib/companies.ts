// ABOUTME: Reads the company collection of the catalog and derives each logo view.
// ABOUTME: An unresolved company identifier stops the build, as a broken claim link does.

import { type Catalog, type Company, type CompanyLogo } from './catalog';

/** Index the companies by company identifier. */
export function companiesById(catalog: Catalog): Map<string, Company> {
  return new Map(catalog.companies.map((company) => [company.id, company]));
}

/** Return one company. An unknown identifier is an error, never a missing logo box. */
export function requireCompany(catalog: Catalog, id: string): Company {
  const company = companiesById(catalog).get(id);
  if (!company) throw new Error(`company "${id}" is not in the catalog.`);
  return company;
}

/**
 * The letters a company shows when the catalog holds no logo for it.
 * A word counts when it starts with a letter or a digit, so "Y Combinator"
 * gives "YC" and "monday.com" gives "M".
 */
export function monogram(name: string): string {
  const letters: string[] = [];
  for (const word of name.split(/\s+/)) {
    if (letters.length === 2) break;
    if (/^[\p{L}\p{N}]/u.test(word)) letters.push(word.charAt(0).toUpperCase());
  }
  return letters.length > 0 ? letters.join('') : name.charAt(0).toUpperCase();
}

/** What a page needs to draw one organization mark. */
export interface CompanyView {
  readonly id: string;
  readonly name: string;
  readonly monogram: string;
  /** The vendored logo, or null when the catalog shows the monogram. */
  readonly logo: CompanyLogo | null;
}

/** Build the view of one company from the catalog. */
export function companyView(catalog: Catalog, companyId: string): CompanyView {
  const company = requireCompany(catalog, companyId);
  return {
    id: company.id,
    name: company.name,
    monogram: monogram(company.name),
    logo: company.logo,
  };
}
