// ABOUTME: Checks the company module: the monogram rule, the company view, and the lookups.
// ABOUTME: The tests read the real catalog, so a broken company link fails here first.

import { describe, expect, it } from 'vitest';
import { loadCatalog } from '../../src/lib/catalog';
import { companiesById, companyView, monogram, requireCompany } from '../../src/lib/companies';

const catalog = loadCatalog();

describe('monogram', () => {
  it('takes the first letter of a one-word name', () => {
    expect(monogram('Airbnb')).toBe('A');
    expect(monogram('DoorDash')).toBe('D');
    expect(monogram('monday.com')).toBe('M');
  });

  it('takes one letter per word and stops at two letters', () => {
    expect(monogram('Y Combinator')).toBe('YC');
    expect(monogram('Y Combinator Research')).toBe('YC');
  });

  it('counts a word that starts with a letter outside ASCII', () => {
    expect(monogram('Über Tech')).toBe('ÜT');
  });

  it('falls back to the first character when no word starts with a letter or a digit', () => {
    // "...S.A." is one word and starts with a dot, so no word counts.
    expect(monogram('...S.A.')).toBe('.');
  });
});

describe('company view', () => {
  it('builds the view of a company whose brand rules keep the monogram', () => {
    expect(companyView(catalog, 'hubspot')).toEqual({
      id: 'hubspot',
      name: 'HubSpot',
      monogram: 'H',
      logo: null,
    });
  });

  it('builds the view of a company with a vendored logo', () => {
    const view = companyView(catalog, 'airbnb');
    expect(view.monogram).toBe('A');
    expect(view.logo?.path).toBe('logos/airbnb.svg');
    expect(view.logo?.media_type).toBe('image/svg+xml');
    expect(view.logo?.sha256).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  it('builds the two-letter monogram of a multi-word company', () => {
    expect(companyView(catalog, 'y-combinator').monogram).toBe('YC');
  });
});

describe('company lookups', () => {
  it('resolves a known identifier through the index and the require helper', () => {
    const byId = companiesById(catalog);
    expect(byId.get('airbnb')?.name).toBe('Airbnb');
    expect(requireCompany(catalog, 'airbnb')).toBe(byId.get('airbnb'));
  });

  it('names the identifier when it does not resolve', () => {
    expect(() => requireCompany(catalog, 'ghost')).toThrow(/company "ghost" is not in the catalog/);
  });
});

describe('the companies of the published catalog', () => {
  it('resolves the company of every approach and declares no spare company', () => {
    const byId = companiesById(catalog);
    const used = new Set<string>();
    for (const approach of catalog.approaches) {
      expect(byId.has(approach.company_id)).toBe(true);
      used.add(approach.company_id);
    }
    expect(used.size).toBe(catalog.companies.length);
  });
});
