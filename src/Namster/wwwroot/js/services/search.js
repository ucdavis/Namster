import fetch from 'isomorphic-fetch';

export function fetchResults(parameters) {
  const { terms, building, department, vlan } = parameters;

  let query = `term=${encodeURIComponent(terms)}`;

  if (building) {
    query += `&building=${encodeURIComponent(building)}`;
  }

  if (department) {
    query += `&department=${encodeURIComponent(department)}`;
  }

  if (vlan) {
    query += `&vlan=${encodeURIComponent(vlan)}`;
  }

  return fetch(`/api/search/query?${query}`)
    .then(res => res.json());
}
