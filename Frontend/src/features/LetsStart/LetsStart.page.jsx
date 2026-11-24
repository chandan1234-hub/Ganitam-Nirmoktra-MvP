import "./LetsStart.style.css";
import "katex/dist/katex.min.css";
import { UserButton, useAuth, useUser } from "@clerk/react";
import { Link } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedText } from "../../components/AnimatedText";
import { LuPlus } from "react-icons/lu";
import { Logo } from "@/components/ui/Logo";
import {
  ChevronRight,
  SquareTerminal,
  Settings2,
  ImageIcon,
  LoaderCircle,
  Send,
  Sparkles,
  Mic,
  MicOff,
  Check,
  ChevronDown,
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
} from "@/components/ui/dropdown-menu";

const USER_SYNC_ENDPOINT = import.meta.env.VITE_USER_SYNC_ENDPOINT || "api/user/sync";
const USER_USAGE_ENDPOINT = import.meta.env.VITE_USER_USAGE_ENDPOINT || "api/user/usage";

const normalizeMathDelimiters = (content) => content
  .replace(/(?<!\\)\\\[([\s\S]*?)(?<!\\)\\\]/g, (_, expression) => `$$${expression}$$`)
  .replace(/(?<!\\)\\\(([\s\S]*?)(?<!\\)\\\)/g, (_, expression) => `$${expression}$`);

const RevealingAssistantContent = ({ content }) => {
  const [visibleContent, setVisibleContent] = useState("");
  const safeContent = normalizeMathDelimiters(
    typeof content === "string" ? content : String(content ?? ""),
  );

  useEffect(() => {
    setVisibleContent("");
    let position = 0;
    const revealTimer = window.setInterval(() => {
      position = Math.min(position + 4, safeContent.length);
      setVisibleContent(safeContent.slice(0, position));

      if (position >= safeContent.length) {
        window.clearInterval(revealTimer);
      }
    }, 14);

    return () => window.clearInterval(revealTimer);
  }, [safeContent]);

  return (
    <div className="assistant-reveal">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false }]]}
      >
        {visibleContent}
      </ReactMarkdown>
    </div>
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
          to: "/",
        },
        {
          title: "About",
          to: "/about",
        },
        {
          title: "Contact",
          to: "/contact",
        },
        {
          title: "FAQ",
          to: "/faq",
        },
        // {
        //   title: "Privacy Policy",
        //   to: "/privacy-policy",
        // },
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      items: [
        {
          title: "Subscription Plans",
          to: "/SubscriptionPlans",
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

const SidebarCollapseButton = () => {
  const { state } = useSidebar();

  return (
    <SidebarTrigger
      className={`lets-start-collapse-button${state === "collapsed" ? " is-collapsed" : ""}`}
    />
  );
};

const LetsStartpage = () => {
  const { getToken, isLoaded, isSignedIn, sessionId, userId } = useAuth();
  const { user } = useUser();
  const historyStorageKey = `ganitam-solver-history:${userId || "anonymous"}`;
  const maxHistoryChats = 10;
  const activeTeam = data.teams[0];
  const ActiveTeamLogo = activeTeam.logo;
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const accountSyncRef = useRef(Promise.resolve());
  const sessionUserIdRef = useRef(null);
  const attemptedSyncSessionIdsRef = useRef(new Set());
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [usage, setUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [solutionMode, setSolutionMode] = useState("single");
  const [examinerMode, setExaminerMode] = useState(false);

  const getAuthConfig = useCallback(async () => {
    const token = await getToken();
    if (!token) throw new Error("Clerk did not provide an authentication token.");
    return { headers: { Authorization: `Bearer ${token}` } };
  }, [getToken]);

  const refreshUsage = async () => {
    try {
      const authConfig = await getAuthConfig();
      const response = await ApiClient.get(USER_USAGE_ENDPOINT, authConfig);
      setUsage(response.data?.data ?? null);
    } catch (usageError) {
      console.warn("Could not refresh solution usage:", usageError);
    }
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !sessionId || !userId) return undefined;

    if (sessionUserIdRef.current !== userId) {
      sessionUserIdRef.current = userId;
      accountSyncRef.current = Promise.resolve();
    }

    const syncKey = `ganitam-user-sync:${sessionId}`;
    let syncWasAttempted = false;
    try {
      syncWasAttempted = sessionStorage.getItem(syncKey) === "attempted";
    } catch (storageError) {
      console.warn("Could not check the user-sync session marker:", storageError);
    }

    if (!syncWasAttempted && !attemptedSyncSessionIdsRef.current.has(sessionId)) {
      attemptedSyncSessionIdsRef.current.add(sessionId);
      try {
        sessionStorage.setItem(syncKey, "attempted");
      } catch (storageError) {
        console.warn("Could not save the user-sync session marker:", storageError);
      }
      accountSyncRef.current = (async () => {
        const authConfig = await getAuthConfig();
        await ApiClient.post(USER_SYNC_ENDPOINT, {}, { ...authConfig, timeout: 10000 });
      })().catch((syncError) => {
        console.error("Could not sync the signed-in user with the backend:", syncError);
      });
    } else if (syncWasAttempted && !attemptedSyncSessionIdsRef.current.has(sessionId)) {
      attemptedSyncSessionIdsRef.current.add(sessionId);
      accountSyncRef.current = Promise.resolve();
    }

    let active = true;
    const navigationEntry = window.performance.getEntriesByType("navigation")[0];
    const isReload = navigationEntry?.type === "reload"
      || window.performance.navigation?.type === 1;

    try {
      const savedMessages = JSON.parse(localStorage.getItem(historyStorageKey) || "[]");
      if (Array.isArray(savedMessages)) {
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

        if (isReload) {
          setMessages(savedMessages);
        }
      }
    } catch {
      localStorage.removeItem(historyStorageKey);
    }

    const loadAccountData = async () => {
      await accountSyncRef.current;
      if (!active) return;

      try {
        const authConfig = await getAuthConfig();
        const response = await ApiClient.get("api/solver/history", authConfig);
        const history = response.data?.data?.history || [];
        setHistoryItems(history.slice(0, maxHistoryChats));
        const restoredMessages = history.slice(0, maxHistoryChats).reverse().flatMap((item) => [
          { role: "user", content: item.question },
          { role: "assistant", content: item.solution },
        ]);

        if (isReload && restoredMessages.length > 0) {
          setMessages((current) => current.length > 0 ? current : restoredMessages.reverse());
        }
      } catch (historyError) {
        console.warn("Could not load chat history; keeping the local copy:", historyError);
      }

      try {
        const authConfig = await getAuthConfig();
        const response = await ApiClient.get(USER_USAGE_ENDPOINT, authConfig);
        if (active) setUsage(response.data?.data ?? null);
      } catch (usageError) {
        console.warn("Could not load solution usage:", usageError);
      }
    };

    void loadAccountData();
    return () => { active = false; };
  }, [getAuthConfig, historyStorageKey, isLoaded, isSignedIn, sessionId, userId]);

  useEffect(() => {
    if (messages.length > 0) {
      const limitedMessages = messages.slice(-(maxHistoryChats * 2));
      localStorage.setItem(historyStorageKey, JSON.stringify(limitedMessages));

      if (limitedMessages.length !== messages.length) {
        setMessages(limitedMessages);
      }
    }
  }, [historyStorageKey, messages]);

  const askAssistant = async (event, prompt) => {
    event?.preventDefault();
    const trimmedQuestion = (prompt ?? question).trim();

    if (!trimmedQuestion || isLoading) return;

    setMessages((current) => [...current, { role: "user", content: trimmedQuestion }]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      await accountSyncRef.current;
      const authConfig = await getAuthConfig();
      const endpoint = import.meta.env.VITE_AI_ENDPOINT || "api/solver/solve";
      const response = await ApiClient.post(endpoint, {
        question: trimmedQuestion,
        subject: "mathematics",
        grade: "general",
        solutionMode,
        examinerMode,
      }, { ...authConfig, timeout: 120000 });
      const solution = response.data?.data?.solution || response.data?.solution;

      if (!solution) throw new Error("The assistant returned an empty response.");
      setMessages((current) => [...current, { role: "assistant", content: solution }]);
      void refreshUsage();
      setHistoryItems((current) => [
        { id: `local-${Date.now()}`, question: trimmedQuestion, solution },
        ...current,
      ].slice(0, maxHistoryChats));
      const history = {
        question: trimmedQuestion,
        solution,
        subject: "mathematics",
        grade: "general",
        solutionMode,
        examinerMode,
      };
      void getAuthConfig()
        .then((historyAuthConfig) => ApiClient.post("api/solver/history", history, historyAuthConfig))
        .catch((historyError) => console.error("Could not save chat history:", historyError));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The assistant is unavailable right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion) => {
    void askAssistant(undefined, suggestion);
  };

  const handleImageSelected = async (event) => {
    const image = event.target.files?.[0];
    event.target.value = "";
    if (!image) return;

    setError("");
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const authConfig = await getAuthConfig();
      const response = await ApiClient.post("api/ocr/extract", formData, {
        ...authConfig,
        headers: { ...authConfig.headers, "Content-Type": "multipart/form-data" },
        timeout: 120000,
      });
      const extractedQuestion = response.data?.extractedQuestion;
      if (!extractedQuestion) throw new Error("No question was found in that image.");
      setQuestion(extractedQuestion);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not read that image.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => { setError(""); setIsListening(true); };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setQuestion((current) => `${current} ${transcript}`.trim());
    };
    recognition.onerror = () => setError("Voice input could not hear that. Please try again.");
    recognition.onend = () => { setIsListening(false); recognitionRef.current = null; };
    recognitionRef.current = recognition;
    recognition.start();
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
    localStorage.removeItem(historyStorageKey);
    setQuestion("");
    setError("");
    void refreshUsage();
  };

  const welcomeTitle = user?.firstName
    ? `Welcome back, ${user.firstName}`
    : "Welcome";

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
      <SidebarCollapseButton />
      {/* The default shadcn sidebar is variant="sidebar" which styles it nicely based on CSS vars */}
      <Sidebar collapsible="icon">
        <div className="lets-start-sidebar-scroll">
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
                        <ActiveTeamLogo className="size-4" />
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
                              <Link to={subItem.to}>
                                <span className="text-base">
                                  {subItem.title}
                                </span>
                              </Link>
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
            <div className="lets-start-history-list">
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
        </div>
      </Sidebar>

      <div
        className="flex-1 flex flex-col min-h-screen w-full relative bg-black"
        ref={containerRef}
      >
        <main className="lets-start-page" aria-label="Ganitam Nirmoktra assistant">
          <div className="assistant-workspace">
            {messages.length === 0 ? (
              <section className="assistant-welcome">
                <div className="assistant-mark" aria-hidden="true"><Sparkles size={18} /></div>
                <AnimatedText
                  text={welcomeTitle}
                  className="assistant-welcome-title justify-center text-5xl font-semibold"
                  wordClass="hero-word"
                />
                <AnimatedText
                  text="Explore multiple methods, follow each step, or upload a photo of a problem."
                  className="assistant-welcome-copy justify-center text-lg mt-4 text-gray-300"
                  wordClass="hero-sub-word"
                />
                {usage?.plan === "free" && Number.isFinite(usage.used) && Number.isFinite(usage.limit) && (
                  <p className="assistant-usage">
                    {usage.used} of {usage.limit} solutions used this month
                  </p>
                )}
                <div className="suggestion-row" aria-label="Example questions">
                  {[
                    "Solve x² + 5x + 6 = 0",
                    "Explain the Pythagoras theorem",
                    "Find the integral of tan⁴x",
                  ].map((suggestion) => (
                    <button type="button" key={suggestion} onClick={() => handleSuggestion(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                  <button type="button" onClick={() => fileInputRef.current?.click()}>
                    Upload a photo of a problem
                  </button>
                </div>
              </section>
            ) : (
              <section className="conversation" aria-live="polite">
                {messages.map((message, index) => (
                  <article className={`message message-${message.role}`} key={`${message.role}-${index}`}>
                    <div className="message-label">{message.role === "assistant" ? "Ganitam" : "You"}</div>
                    <div className="message-content">
                      {message.role === "assistant"
                        ? <RevealingAssistantContent content={message.content} />
                        : message.content}
                    </div>
                  </article>
                ))}
                {isLoading && <div className="message message-assistant loading-message"><LoaderCircle size={18} className="loading-icon" /> Thinking through it...</div>}
              </section>
            )}
          </div>

          <div className="search-bar">
            <input ref={fileInputRef} className="sr-only" type="file" accept="image/*" onChange={handleImageSelected} />
            <form className="composer" onSubmit={askAssistant}>
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) askAssistant(event);
                }}
                rows={1}
                aria-label="Ask a mathematical question"
                placeholder="Ask a mathematical question..."
                className="composer-input"
              />
              <div className="composer-toolbar">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" aria-label="Add an image or voice question" className="composer-tool-button attach-trigger">
                      <LuPlus size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" sideOffset={12} className="min-w-[200px] rounded-xl bg-zinc-900 border border-zinc-700 p-1 shadow-2xl">
                    <DropdownMenuItem onSelect={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      <span>Image question</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={toggleVoiceInput} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors">
                      <Mic className="w-4 h-4 text-emerald-400" />
                      <span>Voice question</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="solution-mode-trigger" aria-label="Choose solution mode">
                      <span>{solutionMode === "single" ? "Single solution" : "Multiple solutions"}</span>
                      <ChevronDown size={15} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" className="solution-mode-menu">
                    <DropdownMenuItem onClick={() => setSolutionMode("single")} className={`solution-mode-item${solutionMode === "single" ? " is-selected" : ""}`}>
                      <span>Single solution</span>{solutionMode === "single" && <Check size={15} className="solution-mode-check" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSolutionMode("multiple")} className={`solution-mode-item${solutionMode === "multiple" ? " is-selected" : ""}`}>
                      <span>Multiple solutions</span>{solutionMode === "multiple" && <Check size={15} className="solution-mode-check" />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <button
                  type="button"
                  className={`examiner-toggle${examinerMode ? " is-active" : ""}`}
                  aria-pressed={examinerMode}
                  onClick={() => setExaminerMode((active) => !active)}
                >
                  <span className="examiner-toggle-track"><span className="examiner-toggle-thumb" /></span>
                  <span>Ask question</span>
                </button>

                <span className="composer-toolbar-spacer" />

                <button type="button" aria-label={isListening ? "Stop voice input" : "Start voice input"} aria-pressed={isListening} onClick={toggleVoiceInput} className={`voice-button${isListening ? " is-listening" : ""}`}>
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button type="submit" aria-label="Send question" disabled={!question.trim() || isLoading} className="send-button">
                  <Send size={18} />
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
