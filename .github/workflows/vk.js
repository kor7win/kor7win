// Инициализация VK Mini App
vkBridge.send("VKWebAppInit");

// Получаем плейлисты группы
async function getPlaylists(groupId) {
  try {
    const response = await vkBridge.send("VKWebAppCallAPIMethod", {
      method: "audio.getPlaylists",
      params: {
        owner_id: -226147406, // ID группы с минусом (например, -12345678)
        access_token: "TNi05PZAPPrloMC0fMVQ", // Нужен ключ доступа (можно получить через Standalone-приложение)
        v: "5.131", // Версия API
      },
    });

    if (response.response) {
      const playlists = response.response.items;
      // Сортируем по алфавиту
      playlists.sort((a, b) => a.title.localeCompare(b.title));
      return playlists;
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return [];
  }
}

// Отображаем плейлисты
async function showPlaylists() {
  const groupId = 226147406; // Замените на ID вашей группы
  const playlists = await getPlaylists(groupId);

  const appDiv = document.getElementById("app");
  if (playlists.length === 0) {
    appDiv.innerHTML = "<p>Плейлисты не найдены</p>";
    return;
  }

  let html = "<h2>Плейлисты группы</h2><ul>";
  playlists.forEach((playlist) => {
    html += `<li><a href="https://vk.com/audio?act=audio_playlist${playlist.owner_id}_${playlist.id}">${playlist.title}</a></li>`;
  });
  html += "</ul>";

  appDiv.innerHTML = html;
}

// Запускаем при загрузке
showPlaylists();
