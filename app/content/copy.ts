import { Language } from "@/lib/i18n";

interface HeroCopy {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Array<{ label: string; value: string; accentIndex: number }>;
}

interface AboutCopy {
  body: string;
  mantra: string[];
}

interface TechStackCopy {
  eyebrow: string;
  title: string;
}

interface ProjectCopy {
  title: string;
  summary: string;
  description: string;
  githubUrl?: string;
  route?: string;
  stack: string[];
}

interface ProjectsCopy {
  eyebrow: string;
  title: string;
  intro: string;
  items: ProjectCopy[];
  githubButton: string;
  viewButton: string;
  modalEyebrow: string;
  modalClose: string;
  repositoryLabel: string;
}

interface ContactCopy {
  eyebrow: string;
  title: string;
  description: string;
  mantra: string;
  labels: {
    name: string;
    email: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  button: string;
  loading: string;
  feedback: {
    missingFields: string;
    success: string;
    error: string;
  };
}

interface FooterCopy {
  tagline: string;
}

export interface Copy {
  hero: HeroCopy;
  about: AboutCopy;
  techStack: TechStackCopy;
  projects: ProjectsCopy;
  contact: ContactCopy;
  footer: FooterCopy;
}

export const translations: Record<Language, Copy> = {
  pt: {
    hero: {
      badge: "Arthur José Regiani · Backend Developer",
      title: "Backend Developer | Learning Solution Architecture & Cloud Design",
      subtitle: "Construo produtos que fazem sentido. Se não fizer, eu refaço até fazer.",
      ctaPrimary: "Ver Projetos",
      ctaSecondary: "LinkedIn",
      stats: [
        { label: "Foco atual", value: "APIs & Cloud AWS", accentIndex: 4 },
        { label: "Especialidade", value: "APIs · Serviços · Integrações", accentIndex: 3 },
        { label: "Mindset", value: "Clareza · Ação · Aprendizado", accentIndex: 6 },
      ],
    },
    about: {
      body:
        "Sou um profissional em constante aprendizado. Atualmente, atuo na construção e desenho de soluções, iniciando minha trajetória em Arquitetura de Software. Tenho experiência em desenvolvimento backend, infraestrutura em nuvem (AWS) e integração de sistemas, e venho direcionando minha carreira para projetar soluções escaláveis, seguras e sustentáveis.",
      mantra: ["Ideias", "Código", "Café", "Deploy", "Repetir"],
    },
    techStack: {
      eyebrow: "Stack",
      title: "Ferramentas que sustentam meus sistemas",
    },
    projects: {
      eyebrow: "Projetos",
      title: "Produtos que contam histórias",
      intro:
        "Cada projeto nasce com foco em propósito, telemetria e feedback contínuo. CoffeeHub é o primeiro de uma série em construção.",
      githubButton: "Repositório GitHub",
      viewButton: "Ver Mais",
      modalEyebrow: "Projeto",
      modalClose: "Fechar",
      repositoryLabel: "Repositório:",
      items: [
        {
          title: "CoffeeHub",
          summary: "App mobile e API completa para rastreabilidade e gestão para cafeicultura.",
          description:
            "CoffeeHub nasceu para conectar o produtor ao consumidor com transparência. Combinei React Native 0.80 + React 19 no front e Django 5 + DRF no backend, com PostgreSQL e Docker para provisionar ambientes reproduzíveis. O resultado é um ecossistema que acompanha todo processo de cultivo dos cafés.",
          route: "Rota dedicada em breve",
          stack: ["React Native", "React 19", "Django 5", "DRF", "PostgreSQL", "Docker"],
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Vamos conversar sobre desenvolvimento, backend ou cafés.",
      description:
        "O formulário dispara um e-mail direto para minha caixa principal. Pode mandar dúvidas, oportunidades ou só um oi.",
      mantra: "Café Fresco → Ideia Bruta → Produto Vivo",
      labels: {
        name: "Nome",
        email: "Email",
        message: "Mensagem",
      },
      placeholders: {
        name: "Como posso te chamar?",
        email: "nome@empresa.com",
        message: "Conte a ideia, contexto e onde posso ajudar.",
      },
      button: "Enviar mensagem",
      loading: "Enviando...",
      feedback: {
        missingFields: "Preencha todos os campos antes de enviar.",
        success: "Mensagem enviada! Retornarei em breve.",
        error: "Não foi possível enviar agora. Tente novamente em instantes.",
      },
    },
    footer: {
      tagline: "Feito com café e consistência.",
    },
  },
  en: {
    hero: {
      badge: "Arthur José Regiani · Backend Developer",
      title: "Backend Developer | Learning Solution Architecture & Cloud Design",
      subtitle: "I build products that make sense. If they don't, I rebuild until they do.",
      ctaPrimary: "View Projects",
      ctaSecondary: "LinkedIn",
      stats: [
        { label: "Current focus", value: "APIs & AWS Cloud", accentIndex: 4 },
        { label: "Specialty", value: "APIs · Services · Integrations", accentIndex: 3 },
        { label: "Mindset", value: "Clarity · Action · Learning", accentIndex: 6 },
      ],
    },
    about: {
      body:
        "I am a professional in constant learning. I design and build solutions while starting my journey into Software Architecture. My background mixes backend development, AWS infrastructure, and system integrations, and I keep steering my career toward scalable, secure, and sustainable solutions.",
      mantra: ["Ideas", "Code", "Coffee", "Deploy", "Repeat"],
    },
    techStack: {
      eyebrow: "Stack",
      title: "Tools that sustain my systems",
    },
    projects: {
      eyebrow: "Projects",
      title: "Products that tell stories",
      intro:
        "Every project begins with purpose, telemetry, and continuous feedback. CoffeeHub is the first of a series under construction.",
      githubButton: "GitHub Repository",
      viewButton: "View more",
      modalEyebrow: "Project",
      modalClose: "Close",
      repositoryLabel: "Repository:",
      items: [
        {
          title: "CoffeeHub",
          summary: "Mobile app and full API for traceability and management in coffee farming.",
          description:
            "CoffeeHub connects growers and consumers with transparency. I combined React Native 0.80 + React 19 on the front and Django 5 + DRF on the backend, with PostgreSQL and Docker for reproducible environments. The result is an ecosystem that monitors the entire coffee cultivation process.",
          route: "Dedicated route coming soon",
          stack: ["React Native", "React 19", "Django 5", "DRF", "PostgreSQL", "Docker"],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about development, backend, or coffee.",
      description:
        "The form sends an email directly to my main inbox. Feel free to send questions, opportunities, or just say hi.",
      mantra: "Fresh Coffee → Raw Idea → Living Product",
      labels: {
        name: "Name",
        email: "Email",
        message: "Message",
      },
      placeholders: {
        name: "How should I call you?",
        email: "name@company.com",
        message: "Share the idea, context, and where I can help.",
      },
      button: "Send message",
      loading: "Sending...",
      feedback: {
        missingFields: "Fill in every field before sending.",
        success: "Message sent! I'll get back to you soon.",
        error: "Couldn't send it now. Please try again shortly.",
      },
    },
    footer: {
      tagline: "Built with coffee and consistency.",
    },
  },
};
