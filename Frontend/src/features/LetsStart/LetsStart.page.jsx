import "./LetsStart.style.css";
import "katex/dist/katex.min.css";
import { UserButton } from "@clerk/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedText } from "../../components/AnimatedText";
import { LuPlus } from "react-icons/lu";
import { Logo } from "@/components/ui/Logo";
import {
  ChevronRight,
  SquareTerminal,
  Settings2,
  Upload,
  ImageIcon,
  FileText,
  LoaderCircle,
  Send,
  Sparkles,
  ChevronDown,
  Mic,
  Check,
} from "lucide-react";
import ApiClient from "../../lib/ApiClient";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const renderAssistantContent = (content) => {
  const normalizedContent = String(content || "")
    .replace(/\\textor\b/g, "\\text{or}")
    .replace(/```(?:latex|tex|math)\s*([\s\S]*?)```/gi, (_, math) => `$$\n${math}\n$$`)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `$$\n${math}\n$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math}$`)
    .replace(/\\\\(?=[()[\]])/g, "\\");

  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {normalizedContent}
    </ReactMarkdown>
  );
};

const data = {
  teams: [
    {
      name: "Ganitam Nirmoktra",
      logo: Logo,
    },
  ],
  navMain: [
    {
      title: "Pages",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/",
        },
        {
          title: "About",
          url: "/about",
        },
        {
          title: "Contact",
          url: "/contact",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "/SubscriptionPlans",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

const SidebarFooterAuth = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="w-full justify-center">
          <UserButton
            showName={!isCollapsed}
            appearance={{
              elements: {
                rootBox: "w-full",
                userButtonTrigger: "w-full flex justify-center",
                userButtonBox: "flex-row justify-between w-full",
                userButtonOuterIdentifier: "truncate font-semibold text-xl",
              },
            }}
          />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const LetsStartSidebarTrigger = () => {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarTrigger
      className={`lets-start-collapse-button ${isCollapsed || isMobile ? "is-collapsed" : ""}`}
    />
  );
};

const LetsStartpage = () => {
  const historyStorageKey = "ganitam-solver-history";
  const maxHistoryChats = 10;
  const activeTeam = data.teams[0];
  const ActiveTeamLogo = activeTeam.logo;
  const containerRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [solutionMode, setSolutionMode] = useState("single");
  const [examinerEnabled, setExaminerEnabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedMessages = JSON.parse(localStorage.getItem(historyStorageKey) || "[]");
      if (Array.isArray(savedMessages)) {
        setMessages(savedMessages);
        const savedHistory = [];
        for (let index = 0; index < savedMessages.length - 1; index += 1) {
          if (savedMessages[index].role === "user" && savedMessages[index + 1].role === "assistant") {
            savedHistory.push({
              id: `local-${index}`,
              question: savedMessages[index].content,
              solution: savedMessages[index + 1].content,
            });
          }
        }
        setHistoryItems(savedHistory.slice(-maxHistoryChats).reverse());
      }
    } catch {
      localStorage.removeItem(historyStorageKey);
    }

    ApiClient.get("api/solver/history")
      .then((response) => {
        const history = response.data?.data?.history || [];
        setHistoryItems(history.slice(0, maxHistoryChats));
        const restoredMessages = history.slice(0, maxHistoryChats).reverse().flatMap((item) => [
          { role: "user", content: item.question },
          { role: "assistant", content: item.solution },
        ]);

        if (restoredMessages.length > 0) {
          setMessages((current) => current.length > 0 ? current : restoredMessages.reverse());
        }
      })
      .catch(() => {
        // The browser copy remains available when the API is offline.
      });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const limitedMessages = messages.slice(-(maxHistoryChats * 2));
      localStorage.setItem(historyStorageKey, JSON.stringify(limitedMessages));

      if (limitedMessages.length !== messages.length) {
        setMessages(limitedMessages);
      }
    }
  }, [messages]);

  const askAssistant = async (event) => {
    event?.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    setMessages((current) => [...current, { role: "user", content: trimmedQuestion }]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const endpoint = import.meta.env.VITE_AI_ENDPOINT || "api/solver/solve";
      const response = await ApiClient.post(endpoint, {
        question: trimmedQuestion,
        subject: "mathematics",
        grade: "general",
        solutionMode,
        examinerMode: examinerEnabled,
      }, { timeout: 120000 });
      const solution = response.data?.data?.solution || response.data?.solution;

      if (!solution) throw new Error("The assistant returned an empty response.");
      setMessages((current) => [...current, { role: "assistant", content: solution }]);
      setHistoryItems((current) => [
        { id: `local-${Date.now()}`, question: trimmedQuestion, solution },
        ...current,
      ].slice(0, maxHistoryChats));
      ApiClient.post("api/solver/history", {
        question: trimmedQuestion,
        solution,
        subject: "mathematics",
        grade: "general",
      }).catch(() => {
        // localStorage preserves the conversation if the history API is unavailable.
      });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The assistant is unavailable right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion) => {
    setQuestion(suggestion);
  };

  const openHistoryChat = (historyItem) => {
    setMessages([
      { role: "user", content: historyItem.question },
      { role: "assistant", content: historyItem.solution },
    ]);
    setError("");
  };

  const startNewChat = () => {
    setMessages([]);
    setQuestion("");
    setError("");
  };


  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".hero-word",
        { y: "120%", opacity: 0, rotate: 3 },
        {
          y: "0%",
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
      )
        .fromTo(
          ".hero-sub-word",
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".search-bar",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4",
        );
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <SidebarProvider>
      {/* The default shadcn sidebar is variant="sidebar" which styles it nicely based on CSS vars */}
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <ActiveTeamLogo className="size-5" />
                    </div>
                    <div className="grid flex-1 text-left leading-tight">
                      <span className="truncate font-semibold text-lg">
                        {activeTeam.name}
                      </span>
                      <span className="truncate text-sm">
                        {activeTeam.plan}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="lets-start-sidebar-content">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  type="button"
                  tooltip="New Chat"
                  onClick={startNewChat}
                  className="h-10 text-base"
                >
                  <LuPlus className="!h-5 !w-5" />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-sm uppercase tracking-wider mt-2 mb-1">
              Platform
            </SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="text-base h-10"
                      >
                        {item.icon && <item.icon className="!w-5 !h-5" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="text-sm h-8"
                            >
                              <a href={subItem.url}>
                                <span className="text-base">
                                  {subItem.title}
                                </span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="lets-start-history-group">
            <SidebarGroupLabel className="text-sm uppercase tracking-wider mt-2 mb-1">
              History
            </SidebarGroupLabel>
            <div className="lets-start-history-list" data-lenis-prevent>
              <SidebarMenu>
                {historyItems.length === 0 ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled className="text-sm text-sidebar-foreground/60">
                      No previous chats
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  historyItems.map((historyItem, index) => (
                    <SidebarMenuItem key={historyItem._id || historyItem.id || index}>
                      <SidebarMenuButton
                        type="button"
                        tooltip={historyItem.question}
                        onClick={() => openHistoryChat(historyItem)}
                        className="h-9 text-sm"
                      >
                        <span className="truncate">{historyItem.question}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </div>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarFooterAuth />
        </SidebarFooter>
      </Sidebar>

      <div
        className="lets-start-shell flex-1 flex flex-col w-full relative bg-black"
        ref={containerRef}
      >
        <LetsStartSidebarTrigger />

        <main className="lets-start-page" aria-label="Ganitam Nirmoktra assistant">
          <div className="assistant-workspace">
            {messages.length === 0 ? (
              <section className="assistant-welcome">
                <div className="assistant-mark" aria-hidden="true"><Sparkles size={18} /></div>
                <AnimatedText
                  text="Welcome to Ganitam Nirmoktra"
                  className="justify-center text-5xl font-semibold"
                  wordClass="hero-word"
                />
                <AnimatedText
                  text="Work through a question with a clear, patient explanation."
                  className="justify-center text-lg mt-4 text-gray-300"
                  wordClass="hero-sub-word"
                />
                <div className="suggestion-row" aria-label="Example questions">
                  {["Explain quadratic equations", "Solve 2x + 7 = 19", "Teach me integration"].map((suggestion) => (
                    <button type="button" key={suggestion} onClick={() => handleSuggestion(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </section>
            ) : (
              <section className="conversation" aria-live="polite">
                {messages.map((message, index) => (
                  <article className={`message message-${message.role}`} key={`${message.role}-${index}`}>
                    <div className="message-label">{message.role === "assistant" ? "Ganitam" : "You"}</div>
                    <div className="message-content">
                      {message.role === "assistant"
                        ? renderAssistantContent(message.content)
                        : message.content}
                    </div>
                  </article>
                ))}
                {isLoading && <div className="message message-assistant loading-message"><LoaderCircle size={18} className="loading-icon" /> Thinking through it...</div>}
              </section>
            )}
          </div>

          <div className="search-bar ">
            <form className="composer" onSubmit={askAssistant}>
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) askAssistant(event);
                }}
                rows={2}
                aria-label="Ask a mathematical question"
                placeholder="Describe the math problem you want to solve..."
                className="composer-input"
              />
              <div className="composer-toolbar">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="composer-tool-button attach-trigger" aria-label="Add an attachment">
                      <LuPlus size={19} aria-hidden="true" />
                      <span className="composer-tool-label">Add</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" sideOffset={12} className="min-w-[180px] rounded-xl bg-zinc-900 border border-zinc-700 p-1 shadow-2xl">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                        <Upload className="w-4 h-4 text-blue-400" /><span>Upload</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                        <ImageIcon className="w-4 h-4 text-emerald-400" /><span>Image</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                        <FileText className="w-4 h-4 text-amber-400" /><span>File</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="solution-mode-trigger" aria-label="Choose solution mode">
                      <span>{solutionMode === "single" ? "Single solution" : "Multiple solutions"}</span>
                      <ChevronDown size={15} aria-hidden="true" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="top" className="solution-mode-menu">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="solution-mode-item" onClick={() => setSolutionMode("single")}>
                        Single solution
                        {solutionMode === "single" && <Check size={15} className="solution-mode-check" aria-hidden="true" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="solution-mode-item" onClick={() => setSolutionMode("multiple")}>
                        Multiple solutions
                        {solutionMode === "multiple" && <Check size={15} className="solution-mode-check" aria-hidden="true" />}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  type="button"
                  className={`examiner-toggle ${examinerEnabled ? "is-active" : ""}`}
                  role="switch"
                  aria-checked={examinerEnabled}
                  aria-label="Toggle examiner mode"
                  onClick={() => setExaminerEnabled((enabled) => !enabled)}
                >
                  <span className="examiner-toggle-track" aria-hidden="true">
                    <span className="examiner-toggle-thumb" />
                  </span>
                  <span>Examiner</span>
                </button>
                <span className="composer-toolbar-spacer" />
                <button type="button" className="composer-tool-button" aria-label="Voice input">
                  <Mic size={17} aria-hidden="true" />
                </button>
                <button type="submit" aria-label="Send question" disabled={!question.trim() || isLoading} className="send-button">
                  <Send size={17} aria-hidden="true" />
                </button>
              </div>
            </form>
            {error && <p className="assistant-error" role="alert">{error}</p>}
            <p className="composer-note">Ganitam can make mistakes. Check important work.</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LetsStartpage;
