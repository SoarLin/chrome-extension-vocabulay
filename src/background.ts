/// <reference types="chrome"/>

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// 監聽來自 popup 或 options 頁面的訊息
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === 'FETCH_VOCABULARY') {
    chrome.storage.local.get(['vocabulary'], (result) => {
      sendResponse({ data: result.vocabulary || [] });
    });
    return true; // 保持 sendResponse 的連線開啟
  }
});