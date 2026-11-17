// Utilidad de persistencia: UNICO lugar del proyecto que usa el modulo fs.
const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

const createStore = (fileName) => {
  const file = path.join(DATA_DIR, fileName);

  const readAll = async () => {
    try {
      return JSON.parse(await fs.readFile(file, 'utf8'));
    } catch (e) {
      if (e.code === 'ENOENT') return [];
      throw e;
    }
  };
  const writeAll = (items) => fs.writeFile(file, JSON.stringify(items, null, 2));

  return {
    findAll: readAll,
    findById: async (idField, id) => (await readAll()).find((i) => i[idField] === id) || null,
    findBy: async (field, value) => (await readAll()).find((i) => i[field] === value) || null,
    filter: async (predicate) => (await readAll()).filter(predicate),
    create: async (idField, data) => {
      const items = await readAll();
      const nextId = items.reduce((m, i) => Math.max(m, i[idField]), 0) + 1;
      const item = { [idField]: nextId, ...data };
      items.push(item);
      await writeAll(items);
      return item;
    },
    update: async (idField, id, data) => {
      const items = await readAll();
      const idx = items.findIndex((i) => i[idField] === id);
      if (idx === -1) return null;
      items[idx] = { ...items[idx], ...data, [idField]: id };
      await writeAll(items);
      return items[idx];
    },
    remove: async (idField, id) => {
      const items = await readAll();
      const idx = items.findIndex((i) => i[idField] === id);
      if (idx === -1) return false;
      items.splice(idx, 1);
      await writeAll(items);
      return true;
    },
  };
};
module.exports = { createStore };
