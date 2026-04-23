/**
 * 10 plats d'exemple — catégories pédagogiques : Entrée, Plat, Dessert, Boisson.
 * Champs : id, name, description, price, category, image
 */
export const menuItems = [
  {
    id: 'd1',
    name: 'Velouté de courge',
    description: 'Creme legere, croutons grilles, un filet d’huile d’olive.',
    price: 7.5,
    category: 'Entrée',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&h=300&fit=crop',
  },
  {
    id: 'd2',
    name: 'Salade de chèvre chaud',
    description: 'Mesclun, toast de chevre, miel, noix, vinaigrette framboise.',
    price: 9.0,
    category: 'Entrée',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  },
  {
    id: 'd3',
    name: 'Tartine avocat & saumon fumé',
    description: 'Pain complet, fromage blanc, citron vert, herbes du jardin.',
    price: 10.5,
    category: 'Entrée',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop',
  },
  {
    id: 'd4',
    name: 'Burger Le Gourmet',
    description: 'Steak hache francais, cheddar, oignons caramels, frites maison.',
    price: 16.5,
    category: 'Plat',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
  },
  {
    id: 'd5',
    name: 'Filet de saumon',
    description: 'Epinards a la creme, riz parfume, echalotes confites.',
    price: 19.0,
    category: 'Plat',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop',
  },
  {
    id: 'd6',
    name: 'Pâtes al ragù',
    description: 'Sauce bolognaise longue cuisson, parmesan Reggiano, basilic frais.',
    price: 14.5,
    category: 'Plat',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
  },
  {
    id: 'd7',
    name: 'Fondant au chocolat',
    description: 'Cœur coulant, creme anglaise a la gousse de vanille.',
    price: 8.5,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
  },
  {
    id: 'd8',
    name: 'Tarte citron meringuée',
    description: 'Pate sablee, creme citron, meringue italienne legerement torrefiee.',
    price: 7.0,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
  },
  {
    id: 'd9',
    name: 'Cidre artisanal bouteille 33cL',
    description: 'Cidre ferme d’Ile-de-France, bouteille fraiche et gazeuse.',
    price: 5.0,
    category: 'Boisson',
    image: 'https://source.unsplash.com/400x300/?cider,bottle',
  },
  {
    id: 'd10',
    name: 'Limonade maison 50cL',
    description: 'Citron, menthe, sucre de canne, eau gazeuse, glacons.',
    price: 4.5,
    category: 'Boisson',
    image: 'https://source.unsplash.com/400x300/?lemonade,glass',
  },
]

/**
 * Filtres : ordre fixe d’affichage des onglets (Entrée → Plat → Dessert → Boisson).
 */
export const menuCategories = ['Entrée', 'Plat', 'Dessert', 'Boisson']
