/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Fellowship of the Ring'},
    {title: 'Two Towers'},
    {title: 'Return of the King'},
    {title: 'Into the Spiderverse'},
    {title: 'Across the Spiderverse'}
  ]);
};
