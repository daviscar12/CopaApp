import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from "@capacitor-community/sqlite";

const dbName = 'appdatabase';
let db: SQLiteDBConnection | null = null;
let initialized = false;
const sqliteDbConnection = new SQLiteConnection(CapacitorSQLite);

export interface StickerSeed {
  id: number;
  name: string;
  team: string;
  image: string;
}

const stickerSeeds: StickerSeed[] = [
  { id: 1, name: 'Neymar', team: 'Brasil', image: 'https://media.gettyimages.com/id/1668971318/pt/foto/belem-brazil-neymar-jr-of-brazil-celebrates-after-scoring-the-fifth-goal-of-his-team-during-a.jpg?s=612x612&w=0&k=20&c=REe1abeJD-Nnk49VDTU3egJAR1GHUafPkyPtEfourz8=' },
  { id: 2, name: 'Vinicius Jr', team: 'Brasil', image: 'https://media.gettyimages.com/id/2171257223/pt/foto/asuncion-paraguay-vinicius-junior-of-brazil-reacts-during-the-international-friendly-match-between.jpg?s=612x612&w=0&k=20&c=-vDlakCN__ARvebJ4_9YVvHxp-wid9ysYW_GVWPn7sY=' },
  { id: 3, name: 'Rodrygo', team: 'Brasil', image: 'https://media.gettyimages.com/id/2169895984/pt/foto/brazils-forward-rodrygo-celebrates-after-scoring-during-the-2026-fifa-world-cup-south-american.jpg?s=612x612&w=0&k=20&c=Gh2YVI7V5kkhcu1JobWjCuTHRSZAWHfdjlmH1IWLoLg=' },
  { id: 4, name: 'Lucas Paqueta', team: 'Brasil', image: 'https://media.gettyimages.com/id/2159751861/pt/foto/las-vegas-nevada-lucas-paqueta-of-brazil-celebrates-after-scoring-the-teams-fourth-goal-via.jpg?s=612x612&w=0&k=20&c=xac0v89701fCFaJFsiOGr99xSOA3pg7PotfnOQT70SE=' },
  { id: 5, name: 'Antony', team: 'Brasil', image: 'https://media.gettyimages.com/id/1476339924/pt/foto/tangier-morocco-antony-of-brazil-reacts-during-the-international-friendly-match-between.jpg?s=612x612&w=0&k=20&c=l9wkesxxttZoJ0jBXn0fVIk_0yd0SseNZXG4tQvojw0=' },
  { id: 6, name: 'Alisson ', team: 'Brasil', image: 'https://media.gettyimages.com/id/2234576115/pt/foto/el-alto-bolivia-alisson-becker-of-brazil-warms-up-prior-to-the-south-american-fifa-world-cup.jpg?s=612x612&w=0&k=20&c=j80P3UALF_w6c2cnhxRAgYXsUEi74E643UYMN9k-Km8=' },
  { id: 7, name: 'Messi', team: 'Argentina', image: 'https://media.gettyimages.com/id/2219558287/pt/foto/buenos-aires-argentina-lionel-messi-of-argentina-looks-on-prior-to-the-fifa-world-cup-2026.jpg?s=612x612&w=0&k=20&c=-1iUR2yB9kFmF76Qr1p3hVmluT4tJqP5Q1dPun3uDNQ=' },
  { id: 8, name: 'Maradona', team: 'Argentina', image: 'https://media.gettyimages.com/id/1365850060/pt/foto/lima-peru-argentina-player-diego-maradona-looks-on-before-a-1986-fifa-world-cup-qualifying.jpg?s=612x612&w=0&k=20&c=GCAszoO7qH6ihG0_9za-tiPmy0TB_mNMGHlS973E66M=' },
  { id: 9, name: 'Enzo Fernandez', team: 'Argentina', image: 'https://media.gettyimages.com/id/2160652629/pt/foto/houston-texas-enzo-fernandez-of-argentina-gestures-during-the-conmebol-copa-america-2024.jpg?s=612x612&w=0&k=20&c=ItAfx5tawdmtzDK6peLyIFL8uLEd9m95Gtdv2RVQ870=' },
  { id: 10, name: 'Julian Alvarez', team: 'Argentina', image: 'https://media.gettyimages.com/id/2161401393/pt/foto/east-rutherford-new-jersey-julian-alvarez-of-argentina-celebrates-after-scoring-the-teams.jpg?s=612x612&w=0&k=20&c=v0JKDaMXH34sJxwfroPolV-XoIk7LKpSoYyV_Ko2YXU=' },
  { id: 11, name: 'Cristiano Ronaldo', team: 'Portugal', image: 'https://media.gettyimages.com/id/2246557116/pt/foto/dublin-ireland-cristiano-ronaldo-of-portugal-reacts-during-the-fifa-world-cup-2026-qualifier.jpg?s=612x612&w=0&k=20&c=y_e7mFHugSMMbJTcZqtS8zLPlJP64PRMqiJm8FfTDgE=' },
  { id: 12, name: 'Bruno Fernandes', team: 'Portugal', image: 'https://media.gettyimages.com/id/2160138340/pt/foto/frankfurt-am-main-germany-bruno-fernandes-of-portugal-celebrates-scoring-the-teams-second.jpg?s=612x612&w=0&k=20&c=jssQH0mnr7bAg-NplNBxpIqfFn0tRv5wdgwZObhNBSQ=' },
  { id: 13, name: 'Diogo Jota', team: 'Portugal', image: 'https://media.gettyimages.com/id/2219696867/pt/foto/munich-germany-diogo-jota-of-portugal-poses-for-a-photograph-with-the-uefa-nations-league.jpg?s=612x612&w=0&k=20&c=mE9qhsuVVJ1jmdtVFrNgSzCrHRSlgXPxxMjGDf6OJUs=' },
  { id: 14, name: 'Pele', team: 'Brasil', image: 'https://media.gettyimages.com/id/1344957147/pt/foto/edson-arantes-do-nascimento-pele-of-brazil-pictured-in-brazil-national-team-shirt.jpg?s=612x612&w=0&k=20&c=ciA00dN0S8oKxo-QZyriTJA-XFsXgzaf5z2XUSrQfRg=' },
  { id: 15, name: 'Ronaldo Fenomeno', team: 'Brasil', image: 'https://media.gettyimages.com/id/52628015/pt/foto/montevideo-uruguay-a-portrait-of-ronaldo-of-brazil-prior-to-the-2006-world-cup-qualifier-south.jpg?s=612x612&w=0&k=20&c=nzsWj0u31J0PHjFeEDNrhCZbRinrvQDvetxBEOaduXw=' },
  { id: 16, name: 'Ronaldinho', team: 'Brasil', image: 'https://media.gettyimages.com/id/53169109/pt/foto/frankfurt-germany-ronaldinho-of-brazil-celebrates-scoring-his-teams-third-goal-during-the-fifa.jpg?s=612x612&w=0&k=20&c=rbCSet_WQ1Qi4MzqnS1Y9pETM-96nh7kRQCUUVGwUfM=' },
  { id: 17, name: 'Mbappe', team: 'Franca', image: 'https://media.gettyimages.com/id/1451380621/pt/foto/lusail-city-qatar-kylian-mbappe-of-france-walks-past-the-fifa-world-cup-trophy-as-he-looks.jpg?s=612x612&w=0&k=20&c=h6hQyG-ELcCousMmxdlRk3QHDFkq_JXsk4SWnRuhIAM=' },
  { id: 18, name: 'Benzema', team: 'Franca', image: 'https://media.gettyimages.com/id/450669792/pt/foto/porto-alegre-brazil-karim-benzema-of-france-celebrates-after-scoring-his-teams-third-goal.jpg?s=612x612&w=0&k=20&c=P7HWjYdt7xlv7ZULPyNTmNMt85ZClFXnW-EH2LYYN5A=' },
  { id: 19, name: 'Griezmann', team: 'Franca', image: 'https://media.gettyimages.com/id/999760104/pt/foto/moscow-russia-antoine-griezmann-of-france-celebrates-with-the-world-cup-trophy-following-his.jpg?s=612x612&w=0&k=20&c=rVRZCBb8d_gsX6eDNTQeHnasP0a_pzds40KhXW0tW2s=' },
  { id: 20, name: 'Kante', team: 'Franca', image: 'https://media.gettyimages.com/id/2157545660/pt/foto/paderborn-germany-ngolo-kante-of-france-poses-for-a-portrait-during-the-france-portrait.jpg?s=612x612&w=0&k=20&c=3LMsEIMBsukLIMCYUzJxXVvoeXFexz4N3DMllubHdMQ=' },
  { id: 21, name: 'Lewandowski', team: 'Polonia', image: 'https://media.gettyimages.com/id/2158626026/pt/foto/berlin-germany-robert-lewandowski-of-poland-shows-dejection-after-marko-arnautovic-of-austria.jpg?s=612x612&w=0&k=20&c=D9Zbo6VpdQnmg4cbKpo2BuKbRhBYSYNb1Uu_89jnZI8=' },
  { id: 22, name: 'Muller', team: 'Alemanha', image: 'https://media.gettyimages.com/id/2160773926/pt/foto/stuttgart-germany-thomas-mueller-of-germany-looks-dejected-after-mikel-merino-of-spain-scores.jpg?s=612x612&w=0&k=20&c=4jm56QB-vXdAlIOkc_6V7_8mfRroHM914sfOIwwUq8M=' },
  { id: 23, name: 'Neuer', team: 'Alemanha', image: 'https://media.gettyimages.com/id/2160776802/pt/foto/stuttgart-germany-manuel-neuer-of-germany-acknowledges-the-fans-after-the-teams-defeat-and.jpg?s=612x612&w=0&k=20&c=JbyA8-g5x_6KLW3mORGT_sU8oYZtUJVUQyLYWS599yc=' },
  { id: 24, name: 'Ruiz', team: 'Espanha', image: 'https://media.gettyimages.com/id/2159982324/pt/foto/cologne-germany-fabian-ruiz-of-spain-celebrates-scoring-his-teams-second-goal-during-the-uefa.jpg?s=612x612&w=0&k=20&c=G_dzP_1uP4UdnBFS84G8cEWt-MqG-IMxUH_Q2709MVQ=' },
  { id: 25, name: 'Busquets', team: 'Espanha', image: 'https://media.gettyimages.com/id/1447307149/pt/foto/al-rayyan-qatar-sergio-busquets-of-spain-during-the-fifa-world-cup-qatar-2022-round-of-16.jpg?s=612x612&w=0&k=20&c=b0zkQxdy4DBgqkTd0KsWm86jnyegJ1kn1s6aA_B7u3E=' }
];

async function getDb() {
  if (!db) {
    throw new Error('Banco de dados não inicializado.');
  }
  return db;
}

export async function initDatabase() {
  if (initialized) {
    return;
  }

  if (!db) {
    db = await sqliteDbConnection.createConnection(dbName, false, 'no-encryption', 1, false);
  }

  await db.open();

  await db.execute(`CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS album_figurinhas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sticker_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    team TEXT NOT NULL,
    image TEXT,
    collected INTEGER NOT NULL DEFAULT 0,
    favorite INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, sticker_id)
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS album_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sticker_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS user_achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    unlocked_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, achievement_id)
  )`);

  const tableInfo = await db.query('PRAGMA table_info(album_figurinhas)');
  const columns = (tableInfo.values || []).map((row: any) => String(row.name).toLowerCase());
  if (!columns.includes('favorite')) {
    await db.execute('ALTER TABLE album_figurinhas ADD COLUMN favorite INTEGER NOT NULL DEFAULT 0');
  }

  initialized = true;
}

export async function addContato(name: string, email: string, telefone: string) {
  await initDatabase();
  const query = 'INSERT INTO contatos (name, email, telefone) VALUES (?, ?, ?)';
  await (await getDb()).run(query, [name, email, telefone]);
}

export async function listContatos() {
  await initDatabase();
  const result = await (await getDb()).query('SELECT * FROM contatos');
  return result.values || [];
}

export async function deleteContatoById(id: number) {
  await initDatabase();
  const query = 'DELETE FROM contatos WHERE id = ?';
  return await (await getDb()).run(query, [id]);
}

export async function updateContato(id: number, name: string, email: string, telefone: string) {
  await initDatabase();
  const query = 'UPDATE contatos SET name = ?, email = ?, telefone = ? WHERE id = ?';
  await (await getDb()).run(query, [name, email, telefone, id]);
}

export async function findContatoById(id: number) {
  await initDatabase();
  const query = 'SELECT * FROM contatos WHERE id = ?';
  const result = await (await getDb()).query(query, [id]);
  return result.values?.[0] || null;
}

export async function addUsuario(nome: string, login: string, senha: string) {
  await initDatabase();
  const existing = await findUsuarioByLogin(login);
  if (existing) {
    throw new Error('E-mail já cadastrado');
  }

  const query = 'INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)';
  await (await getDb()).run(query, [nome, login, senha]);
  const created = await realizarLogin(login, senha);
  return created;
}

export async function realizarLogin(login: string, senha: string) {
  await initDatabase();
  const query = 'SELECT id, nome, login FROM usuarios WHERE login = ? AND senha = ?';
  const result = await (await getDb()).query(query, [login, senha]);
  return result.values?.[0] || null;
}

export async function updateUsuario(id: number, nome: string, login: string, senha: string) {
  await initDatabase();
  const query = 'UPDATE usuarios SET nome = ?, login = ?, senha = ? WHERE id = ?';
  return await (await getDb()).run(query, [nome, login, senha, id]);
}

export async function listUsuarios() {
  await initDatabase();
  const result = await (await getDb()).query('SELECT id, nome, login FROM usuarios');
  return result.values || [];
}

export async function findUsuarioById(id: number) {
  await initDatabase();
  const query = 'SELECT id, nome, login FROM usuarios WHERE id = ?';
  const result = await (await getDb()).query(query, [id]);
  return result.values?.[0] || null;
}

export async function findUsuarioByLogin(login: string) {
  await initDatabase();
  const result = await (await getDb()).query('SELECT id, nome, login FROM usuarios WHERE login = ?', [login]);
  return result.values?.[0] || null;
}

async function ensureAlbumSeed(userId: number) {
  await initDatabase();
  const countResult = await (await getDb()).query('SELECT COUNT(*) as total FROM album_figurinhas WHERE user_id = ?', [userId]);
  const total = Number((countResult.values?.[0] as { total?: number } | undefined)?.total || 0);

  if (total > 0) {
    return;
  }

  for (const sticker of stickerSeeds) {
    await (await getDb()).run(
      'INSERT INTO album_figurinhas (user_id, sticker_id, name, team, image, collected, favorite) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, sticker.id, sticker.name, sticker.team, sticker.image, 0, 0]
    );
  }
}

export async function listStickersForUser(userId: number, options?: { search?: string; filter?: 'all' | 'collected' | 'pending' | 'favorites' }) {
  await ensureAlbumSeed(userId);

  const search = options?.search?.trim().toLowerCase() || '';
  const filter = options?.filter || 'all';
  let query = 'SELECT sticker_id AS id, name, team, image, collected, favorite FROM album_figurinhas WHERE user_id = ?';
  const params: Array<string | number> = [userId];

  if (search) {
    query += ' AND (lower(name) LIKE ? OR lower(team) LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term);
  }

  if (filter === 'collected') {
    query += ' AND collected = 1';
  } else if (filter === 'pending') {
    query += ' AND collected = 0';
  } else if (filter === 'favorites') {
    query += ' AND favorite = 1';
  }

  query += ' ORDER BY sticker_id';
  const result = await (await getDb()).query(query, params);
  return (result.values || []).map((row: any) => ({
    id: Number(row.id),
    name: String(row.name),
    team: String(row.team),
    image: row.image ? String(row.image) : undefined,
    collected: Number(row.collected) === 1,
    favorite: Number(row.favorite) === 1
  }));
}

export async function listFavoriteStickersForUser(userId: number) {
  await ensureAlbumSeed(userId);

  const query = 'SELECT sticker_id AS id, name, team, image, collected, favorite FROM album_figurinhas WHERE user_id = ? AND favorite = 1 ORDER BY sticker_id';
  const result = await (await getDb()).query(query, [userId]);
  return (result.values || []).map((row: any) => ({
    id: Number(row.id),
    name: String(row.name),
    team: String(row.team),
    image: row.image ? String(row.image) : undefined,
    collected: Number(row.collected) === 1,
    favorite: Number(row.favorite) === 1
  }));
}

export async function listStickerHistoryForUser(userId: number, limit = 15) {
  await ensureAlbumSeed(userId);
  const query = `SELECT history.id, history.sticker_id AS stickerId, history.action, history.created_at AS createdAt,
    album.name, album.team, album.image
    FROM album_history history
    INNER JOIN album_figurinhas album ON history.user_id = album.user_id AND history.sticker_id = album.sticker_id
    WHERE history.user_id = ?
    ORDER BY history.created_at DESC
    LIMIT ?`;

  const result = await (await getDb()).query(query, [userId, limit]);
  return (result.values || []).map((row: any) => ({
    id: Number(row.id),
    stickerId: Number(row.stickerId),
    action: String(row.action) as 'collected' | 'removed' | 'favorite' | 'unfavorite',
    createdAt: String(row.createdAt),
    name: String(row.name),
    team: String(row.team),
    image: row.image ? String(row.image) : undefined
  }));
}

async function recordAlbumHistory(userId: number, stickerId: number, action: string) {
  await (await getDb()).run(
    'INSERT INTO album_history (user_id, sticker_id, action) VALUES (?, ?, ?)',
    [userId, stickerId, action]
  );
}

export async function toggleStickerCollectedForUser(userId: number, stickerId: number) {
  await ensureAlbumSeed(userId);

  const result = await (await getDb()).query('SELECT collected FROM album_figurinhas WHERE user_id = ? AND sticker_id = ?', [userId, stickerId]);
  const currentValue = Number((result.values?.[0] as { collected?: number } | undefined)?.collected || 0) === 1;
  const nextValue = currentValue ? 0 : 1;

  await (await getDb()).run('UPDATE album_figurinhas SET collected = ? WHERE user_id = ? AND sticker_id = ?', [nextValue, userId, stickerId]);
  await recordAlbumHistory(userId, stickerId, nextValue ? 'collected' : 'removed');
  return nextValue === 1;
}

export async function toggleStickerFavoriteForUser(userId: number, stickerId: number) {
  await ensureAlbumSeed(userId);

  const result = await (await getDb()).query('SELECT favorite FROM album_figurinhas WHERE user_id = ? AND sticker_id = ?', [userId, stickerId]);
  const currentValue = Number((result.values?.[0] as { favorite?: number } | undefined)?.favorite || 0) === 1;
  const nextValue = currentValue ? 0 : 1;

  await (await getDb()).run('UPDATE album_figurinhas SET favorite = ? WHERE user_id = ? AND sticker_id = ?', [nextValue, userId, stickerId]);
  await recordAlbumHistory(userId, stickerId, nextValue ? 'favorite' : 'unfavorite');
  return nextValue === 1;
}

export async function getAlbumStatsForUser(userId: number) {
  await ensureAlbumSeed(userId);
  const result = await (await getDb()).query(
    'SELECT COUNT(*) AS total, SUM(collected) AS collected, SUM(favorite) AS favorites FROM album_figurinhas WHERE user_id = ?',
    [userId]
  );
  const row = result.values?.[0] as { total?: number; collected?: number; favorites?: number } | undefined;
  const total = Number(row?.total || 0);
  const collected = Number(row?.collected || 0);
  const favorites = Number(row?.favorites || 0);
  const pending = total - collected;
  const progress = total > 0 ? Math.round((collected / total) * 100) : 0;

  return { total, collected, pending, favorites, progress };
}

async function seedAchievements() {
  const definitions = [
    { id: 1, name: 'Primeira Figurinha', description: 'Desbloquear ao coletar a primeira figurinha.', icon: 'trophy' },
    { id: 2, name: 'Iniciante', description: 'Coletar 10 figurinhas.', icon: 'star' },
    { id: 3, name: 'Colecionador', description: 'Coletar 25 figurinhas.', icon: 'medal' },
    { id: 4, name: 'Álbum em Construção', description: 'Coletar 50 figurinhas.', icon: 'flash' },
    { id: 5, name: 'Caçador de Raras', description: 'Coletar 5 figurinhas raras.', icon: 'sparkles' },
    { id: 6, name: 'Especialista em Raras', description: 'Coletar 15 figurinhas raras.', icon: 'sparkles' },
    { id: 7, name: 'Brilho Inicial', description: 'Coletar 3 figurinhas brilhantes.', icon: 'ribbon' },
    { id: 8, name: 'Mestre das Brilhantes', description: 'Coletar 10 figurinhas brilhantes.', icon: 'ribbonOutline' },
    { id: 9, name: 'Álbum Quase Completo', description: 'Completar 80% do álbum.', icon: 'checkmarkCircle' },
    { id: 10, name: 'Campeão da Copa', description: 'Completar 100% do álbum.', icon: 'trophy' }
  ];

  for (const achievement of definitions) {
    await (await getDb()).run(
      'INSERT OR IGNORE INTO achievements (id, name, description, icon) VALUES (?, ?, ?, ?)',
      [achievement.id, achievement.name, achievement.description, achievement.icon]
    );
  }
}

async function getAchievementThresholds(userId: number) {
  const counts = await (await getDb()).query(
    'SELECT SUM(collected) AS totalCollected, SUM(favorite) AS totalFavorites FROM album_figurinhas WHERE user_id = ?',
    [userId]
  );
  const row = counts.values?.[0] as { totalCollected?: number; totalFavorites?: number } | undefined;
  const totalCollected = Number(row?.totalCollected || 0);
  const totalFavorites = Number(row?.totalFavorites || 0);
  const statsResult = await getAlbumStatsForUser(userId);

  return {
    totalCollected,
    totalFavorites,
    progress: statsResult.progress
  };
}

export async function recalculateUserAchievements(userId: number) {
  await ensureAlbumSeed(userId);
  await seedAchievements();

  const { totalCollected, totalFavorites, progress } = await getAchievementThresholds(userId);
  const rows = await (await getDb()).query('SELECT achievement_id FROM user_achievements WHERE user_id = ?', [userId]);
  const unlocked = new Set((rows.values || []).map((row: any) => Number(row.achievement_id)));

  const toUnlock: number[] = [];

  if (totalCollected >= 1) toUnlock.push(1);
  if (totalCollected >= 10) toUnlock.push(2);
  if (totalCollected >= 25) toUnlock.push(3);
  if (totalCollected >= 50) toUnlock.push(4);
  if (totalFavorites >= 5) toUnlock.push(5);
  if (totalFavorites >= 15) toUnlock.push(6);
  if (totalFavorites >= 3) toUnlock.push(7);
  if (totalFavorites >= 10) toUnlock.push(8);
  if (progress >= 80) toUnlock.push(9);
  if (progress >= 100) toUnlock.push(10);

  for (const achievementId of toUnlock) {
    if (!unlocked.has(achievementId)) {
      await (await getDb()).run(
        'INSERT INTO user_achievements (user_id, achievement_id) VALUES (?, ?)',
        [userId, achievementId]
      );
    }
  }
}

export async function listAchievementsForUser(userId: number) {
  await seedAchievements();
  const query = `SELECT a.id, a.name, a.description, a.icon, ua.unlocked_at AS unlockedAt
    FROM achievements a
    LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.user_id = ?
    ORDER BY a.id`;
  const result = await (await getDb()).query(query, [userId]);
  return (result.values || []).map((row: any) => ({
    id: Number(row.id),
    name: String(row.name),
    description: String(row.description),
    icon: String(row.icon),
    unlocked: row.unlockedAt != null,
    unlockedAt: row.unlockedAt ? String(row.unlockedAt) : null
  }));
}
