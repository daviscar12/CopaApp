import { ref, computed } from 'vue';

interface Sticker { id: number; name: string; team: string; image?: string; collected?: boolean }

const stickers = ref<Sticker[]>([
  { id: 1, name: 'Neymar', team: 'Brasil', image: 'https://media.gettyimages.com/id/1668971318/pt/foto/belem-brazil-neymar-jr-of-brazil-celebrates-after-scoring-the-fifth-goal-of-his-team-during-a.jpg?s=612x612&w=0&k=20&c=REe1abeJD-Nnk49VDTU3egJAR1GHUafPkyPtEfourz8=', collected: false },
  { id: 2, name: 'Vinicius Jr', team: 'Brasil', image: 'https://media.gettyimages.com/id/2171257223/pt/foto/asuncion-paraguay-vinicius-junior-of-brazil-reacts-during-the-south-american-fifa-world-cup.jpg?s=612x612&w=0&k=20&c=-vDlakCN__ARvebJ4_9YVvHxp-wid9ysYW_GVWPn7sY=', collected: true },
  { id: 3, name: 'Rodrygo', team: 'Brasil', image: 'https://media.gettyimages.com/id/2169895984/pt/foto/brazils-forward-rodrygo-celebrates-after-scoring-during-the-2026-fifa-world-cup-south-american.jpg?s=612x612&w=0&k=20&c=Gh2YVI7V5kkhcu1JobWjCuTHRSZAWHfdjlmH1IWLoLg=', collected: false },
  { id: 4, name: 'Lucas Paqueta', team: 'Brasil', image: 'https://media.gettyimages.com/id/2159751861/pt/foto/las-vegas-nevada-lucas-paqueta-of-brazil-celebrates-after-scoring-the-teams-fourth-goal-via.jpg?s=612x612&w=0&k=20&c=xac0v89701fCFaJFsiOGr99xSOA3pg7PotfnOQT70SE=', collected: true },
  { id: 5, name: 'Antony', team: 'Brasil', image: 'https://media.gettyimages.com/id/1476339924/pt/foto/tangier-morocco-antony-of-brazil-reacts-during-the-international-friendly-match-between.jpg?s=612x612&w=0&k=20&c=l9wkesxxttZoJ0jBXn0fVIk_0yd0SseNZXG4tQvojw0=', collected: false },
  { id: 6, name: 'Alisson ', team: 'Brasil', image: 'https://media.gettyimages.com/id/2234576115/pt/foto/el-alto-bolivia-alisson-becker-of-brazil-warms-up-prior-to-the-south-american-fifa-world-cup.jpg?s=612x612&w=0&k=20&c=j80P3UALF_w6c2cnhxRAgYXsUEi74E643UYMN9k-Km8=', collected: false },
  { id: 7, name: 'Messi', team: 'Argentina', image: 'https://media.gettyimages.com/id/2219558287/pt/foto/buenos-aires-argentina-lionel-messi-of-argentina-looks-on-prior-to-the-fifa-world-cup-2026.jpg?s=612x612&w=0&k=20&c=-1iUR2yB9kFmF76Qr1p3hVmluT4tJqP5Q1dPun3uDNQ=', collected: true },
  { id: 8, name: 'Maradona', team: 'Argentina', image: 'https://media.gettyimages.com/id/1365850060/pt/foto/lima-peru-argentina-player-diego-maradona-looks-on-before-a-1986-fifa-world-cup-qualifying.jpg?s=612x612&w=0&k=20&c=GCAszoO7qH6ihG0_9za-tiPmy0TB_mNMGHlS973E66M=', collected: false },
  { id: 9, name: 'Enzo Fernandez', team: 'Argentina', image: 'https://media.gettyimages.com/id/2160652629/pt/foto/houston-texas-enzo-fernandez-of-argentina-gestures-during-the-conmebol-copa-america-2024.jpg?s=612x612&w=0&k=20&c=ItAfx5tawdmtzDK6peLyIFL8uLEd9m95Gtdv2RVQ870=', collected: false },
  { id: 10, name: 'Julian Alvarez', team: 'Argentina', image: 'https://media.gettyimages.com/id/2161401393/pt/foto/east-rutherford-new-jersey-julian-alvarez-of-argentina-celebrates-after-scoring-the-teams.jpg?s=612x612&w=0&k=20&c=v0JKDaMXH34sJxwfroPolV-XoIk7LKpSoYyV_Ko2YXU=', collected: true },
  { id: 11, name: 'Cristiano Ronaldo', team: 'Portugal', image: 'https://media.gettyimages.com/id/2246557116/pt/foto/dublin-ireland-cristiano-ronaldo-of-portugal-reacts-during-the-fifa-world-cup-2026-qualifier.jpg?s=612x612&w=0&k=20&c=y_e7mFHugSMMbJTcZqtS8zLPlJP64PRMqiJm8FfTDgE=', collected: false },
  { id: 12, name: 'Bruno Fernandes', team: 'Portugal', image: 'https://media.gettyimages.com/id/2160138340/pt/foto/frankfurt-am-main-germany-bruno-fernandes-of-portugal-celebrates-scoring-the-teams-second.jpg?s=612x612&w=0&k=20&c=jssQH0mnr7bAg-NplNBxpIqfFn0tRv5wdgwZObhNBSQ=', collected: true },
  { id: 13, name: 'Diogo Jota', team: 'Portugal', image: 'https://media.gettyimages.com/id/2219696867/pt/foto/munich-germany-diogo-jota-of-portugal-poses-for-a-photograph-with-the-uefa-nations-league.jpg?s=612x612&w=0&k=20&c=mE9qhsuVVJ1jmdtVFrNgSzCrHRSlgXPxxMjGDf6OJUs=', collected: false },
  { id: 14, name: 'Pele', team: 'Brasil', image: 'https://media.gettyimages.com/id/1344957147/pt/foto/edson-arantes-do-nascimento-pele-of-brazil-pictured-in-brazil-national-team-shirt.jpg?s=612x612&w=0&k=20&c=ciA00dN0S8oKxo-QZyriTJA-XFsXgzaf5z2XUSrQfRg=', collected: true },
  { id: 15, name: 'Ronaldo Fenomeno', team: 'Brasil', image: 'https://media.gettyimages.com/id/52628015/pt/foto/montevideo-uruguay-a-portrait-of-ronaldo-of-brazil-prior-to-the-2006-world-cup-qualifier-south.jpg?s=612x612&w=0&k=20&c=nzsWj0u31J0PHjFeEDNrhCZbRinrvQDvetxBEOaduXw=', collected: false },
  { id: 16, name: 'Ronaldinho', team: 'Brasil', image: 'https://media.gettyimages.com/id/53169109/pt/foto/frankfurt-germany-ronaldinho-of-brazil-celebrates-scoring-his-teams-third-goal-during-the-fifa.jpg?s=612x612&w=0&k=20&c=rbCSet_WQ1Qi4MzqnS1Y9pETM-96nh7kRQCUUVGwUfM=', collected: true },
  { id: 17, name: 'Mbappe', team: 'Franca', image: 'https://media.gettyimages.com/id/1451380621/pt/foto/lusail-city-qatar-kylian-mbappe-of-france-walks-past-the-fifa-world-cup-trophy-as-he-looks.jpg?s=612x612&w=0&k=20&c=h6hQyG-ELcCousMmxdlRk3QHDFkq_JXsk4SWnRuhIAM=', collected: false },
  { id: 18, name: 'Benzema', team: 'Franca', image: 'https://media.gettyimages.com/id/450669792/pt/foto/porto-alegre-brazil-karim-benzema-of-france-celebrates-after-scoring-his-teams-third-goal.jpg?s=612x612&w=0&k=20&c=P7HWjYdt7xlv7ZULPyNTmNMt85ZClFXnW-EH2LYYN5A=', collected: true },
  { id: 19, name: 'Griezmann', team: 'Franca', image: 'https://media.gettyimages.com/id/999760104/pt/foto/moscow-russia-antoine-griezmann-of-france-celebrates-with-the-world-cup-trophy-following-his.jpg?s=612x612&w=0&k=20&c=rVRZCBb8d_gsX6eDNTQeHnasP0a_pzds40KhXW0tW2s=', collected: false },
  { id: 20, name: 'Kante', team: 'Franca', image: 'https://media.gettyimages.com/id/2157545660/pt/foto/paderborn-germany-ngolo-kante-of-france-poses-for-a-portrait-during-the-france-portrait.jpg?s=612x612&w=0&k=20&c=3LMsEIMBsukLIMCYUzJxXVvoeXFexz4N3DMllubHdMQ=', collected: true },
  { id: 21, name: 'Lewandowski', team: 'Polonia', image: 'https://media.gettyimages.com/id/2158626026/pt/foto/berlin-germany-robert-lewandowski-of-poland-shows-dejection-after-marko-arnautovic-of-austria.jpg?s=612x612&w=0&k=20&c=D9Zbo6VpdQnmg4cbKpo2BuKbRhBYSYNb1Uu_89jnZI8=', collected: false },
  { id: 22, name: 'Muller', team: 'Alemanha', image: 'https://media.gettyimages.com/id/2160773926/pt/foto/stuttgart-germany-thomas-mueller-of-germany-looks-dejected-after-mikel-merino-of-spain-scores.jpg?s=612x612&w=0&k=20&c=4jm56QB-vXdAlIOkc_6V7_8mfRroHM914sfOIwwUq8M=', collected: true },
  { id: 23, name: 'Neuer', team: 'Alemanha', image: 'https://media.gettyimages.com/id/2160776802/pt/foto/stuttgart-germany-manuel-neuer-of-germany-acknowledges-the-fans-after-the-teams-defeat-and.jpg?s=612x612&w=0&k=20&c=JbyA8-g5x_6KLW3mORGT_sU8oYZtUJVUQyLYWS599yc=', collected: false },
  { id: 24, name: 'Ruiz', team: 'Espanha', image: 'https://media.gettyimages.com/id/2159982324/pt/foto/cologne-germany-fabian-ruiz-of-spain-celebrates-scoring-his-teams-second-goal-during-the-uefa.jpg?s=612x612&w=0&k=20&c=G_dzP_1uP4UdnBFS84G8cEWt-MqG-IMxUH_Q2709MVQ=', collected: true },
  { id: 25, name: 'Busquets', team: 'Espanha', image: 'https://media.gettyimages.com/id/1447307149/pt/foto/al-rayyan-qatar-sergio-busquets-of-spain-during-the-fifa-world-cup-qatar-2022-round-of-16.jpg?s=612x612&w=0&k=20&c=b0zkQxdy4DBgqkTd0KsWm86jnyegJ1kn1s6aA_B7u3E=', collected: false }
]);

const search = ref('');
const filter = ref<'all'|'collected'|'pending'>('all');

function toggleCollected(id: number) {
  const s = stickers.value.find(x => x.id === id);
  if (s) s.collected = !s.collected;
}

const filtered = computed(() => {
  return stickers.value.filter(s => {
    if (search.value && !(`${s.name}`.toLowerCase().includes(search.value.toLowerCase()) || `${s.team}`.toLowerCase().includes(search.value.toLowerCase()))) return false;
    if (filter.value === 'collected') return s.collected;
    if (filter.value === 'pending') return !s.collected;
    return true;
  });
});

export function useAlbum() {
  return { stickers, search, filter, filtered, toggleCollected };
}
