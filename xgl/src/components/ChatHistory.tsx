// 从React库导入React对象
import React from 'react';
// 导入Chat类型定义
import { Chat } from '../types';
// 导入路由相关的钩子和组件
import { Link, useParams } from 'react-router-dom';

// 定义组件属性接口
interface ChatHistoryProps {
  chats: Chat[];          // 聊天历史列表
  onNewChat: () => void;  // 创建新聊天的回调函数
}

// 聊天历史组件：显示聊天会话历史列表和创建新会话按钮
const ChatHistory: React.FC<ChatHistoryProps> = ({ chats, onNewChat }) => {
  // 使用useParams钩子获取当前URL中的chatId参数
  const { chatId } = useParams<{ chatId: string }>();
  
  return (
    <div className="bg-gray-900 text-white h-full flex flex-col" style={{ width: '260px' }}>
      {/* 新建聊天按钮 */}
      <div className="p-3">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-3 rounded-md border border-white/20 p-3 text-sm hover:bg-gray-700 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          新对话
        </button>
      </div>
      
      {/* 聊天历史列表区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <h3 className="text-xs text-gray-500 font-medium">今天</h3>
          <ul className="mt-2 space-y-1">
            {chats
              // 按更新时间降序排序，最新的聊天显示在前面
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map(chat => (
                <li key={chat.id}>
                  {/* 聊天会话链接，点击跳转到对应的聊天页面 */}
                  <Link 
                    to={`/chat/${chat.id}`}
                    className={`flex px-3 py-2 rounded-md text-sm ${chatId === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mr-2 flex-shrink-0"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    {/* 显示聊天标题，超出部分截断 */}
                    <span className="truncate">{chat.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory; 