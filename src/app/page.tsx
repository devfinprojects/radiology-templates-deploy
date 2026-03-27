"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  Plus,
  Star,
  StarOff,
  Copy,
  Edit,
  Trash2,
  FileText,
  Layers,
  Brain,
  Activity,
  Sun,
  Waves,
  Heart,
  Video,
  Syringe,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Command as CommandIcon,
  Loader2,
  LayoutTemplate,
  FileCode,
  Filter,
  Sparkles,
  CheckCheck,
  LogOut,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Function to generate normal report from template
const generateNormalReport = (content: string): string => {
  // Common replacements for normal findings
  const normalReplacements: Record<string, string> = {
    // Clinical indication
    "[Indication]": "Routine evaluation",
    "[indication]": "Routine evaluation",
    // Measurements - normal values
    "[X]": "within normal limits",
    "[x]": "within normal limits",
    "[__]": "normal",
    "[mm]": "within normal range",
    "[cm]": "within normal range",
    "[measurement]": "within normal limits",
    "[value]": "normal",
    "[number]": "normal",
    "[size]": "normal",
    "[dimensions]": "within normal limits",
    // Laterality
    "[LATERALITY]": "",
    "[SIDE]": "",
    "[Side]": "",
    // Views
    "[VIEWS]": "standard views",
    // Specific findings
    "[describe]": "normal",
    "[description]": "normal findings",
    "[findings]": "No abnormality detected",
    "[location]": "as expected",
    "[level]": "normal",
    "[type]": "normal",
    "[degree]": "within normal limits",
    "[severity]": "none",
    "[assessment]": "normal",
    "[result]": "normal",
    "[status]": "normal",
    "[percentage]": "within normal range",
    "[degrees]": "within normal range",
    "[grade]": "normal",
    "[stage]": "early",
    // Time-related
    "[time]": "normal",
    "[minutes]": "within normal range",
    "[hours]": "within expected timeframe",
    // Organ-specific normal findings
    "[liver size]": "normal",
    "[spleen size]": "normal",
    "[kidney size]": "normal",
    "[cardiac size]": "normal",
    "[ventricle size]": "normal",
    // Generic placeholders
    "[specify]": "as noted",
    "[note]": "",
    "[comment]": "",
    "[other]": "none",
    "[additional findings]": "none",
  }

  let normalContent = content

  // Apply replacements
  Object.entries(normalReplacements).forEach(([placeholder, replacement]) => {
    normalContent = normalContent.split(placeholder).join(replacement)
  })

  // Clean up any remaining bracket placeholders with generic normal values
  normalContent = normalContent.replace(/\[[^\]]+\]/g, (match) => {
    // Check if it looks like a measurement placeholder
    if (match.toLowerCase().includes("mm") || match.toLowerCase().includes("cm") || match.toLowerCase().includes("size")) {
      return "within normal limits"
    }
    return "normal"
  })

  // Clean up multiple spaces and lines
  normalContent = normalContent
    .replace(/  +/g, " ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim()

  return normalContent
}

// Types
interface Category {
  id: string
  name: string
  description: string | null
  icon: string | null
  color: string | null
  _count?: { templates: number; snippets: number }
}

interface BodyPart {
  id: string
  name: string
  description: string | null
  _count?: { templates: number; snippets: number }
}

interface Template {
  id: string
  title: string
  description: string | null
  content: string
  categoryId: string | null
  bodyPartId: string | null
  modality: string | null
  tags: string | null
  isFavorite: boolean
  usageCount: number
  category?: Category | null
  bodyPart?: BodyPart | null
  searchScore?: number
  matchType?: string
}

interface Snippet {
  id: string
  title: string
  description: string | null
  content: string
  categoryId: string | null
  bodyPartId: string | null
  modality: string | null
  tags: string | null
  isFavorite: boolean
  usageCount: number
  category?: Category | null
  bodyPart?: BodyPart | null
  searchScore?: number
  matchType?: string
}

type ItemType = "template" | "snippet"

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  CT: <Activity className="h-4 w-4" />,
  MRI: <Brain className="h-4 w-4" />,
  "X-Ray": <Sun className="h-4 w-4" />,
  Ultrasound: <Waves className="h-4 w-4" />,
  Mammography: <Heart className="h-4 w-4" />,
  "Nuclear Medicine": <Activity className="h-4 w-4" />,
  Fluoroscopy: <Video className="h-4 w-4" />,
  Interventional: <Syringe className="h-4 w-4" />,
}

// Category colors
const categoryColors: Record<string, string> = {
  CT: "bg-blue-500/10 text-blue-600 border-blue-200",
  MRI: "bg-purple-500/10 text-purple-600 border-purple-200",
  "X-Ray": "bg-amber-500/10 text-amber-600 border-amber-200",
  Ultrasound: "bg-teal-500/10 text-teal-600 border-teal-200",
  Mammography: "bg-pink-500/10 text-pink-600 border-pink-200",
  "Nuclear Medicine": "bg-green-500/10 text-green-600 border-green-200",
  Fluoroscopy: "bg-orange-500/10 text-orange-600 border-orange-200",
  Interventional: "bg-red-500/10 text-red-600 border-red-200",
}

export default function RadiologyTemplates() {
  const router = useRouter()
  
  // State
  const [categories, setCategories] = useState<Category[]>([])
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
  const [selectedModality, setSelectedModality] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ItemType>("template")
  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  // Editor state
  const [editingItem, setEditingItem] = useState<Template | Snippet | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorContent, setEditorContent] = useState("")
  const [editorTitle, setEditorTitle] = useState("")
  const [editorDescription, setEditorDescription] = useState("")
  const [editorCategoryId, setEditorCategoryId] = useState<string>("")
  const [editorBodyPartId, setEditorBodyPartId] = useState<string>("")
  const [editorModality, setEditorModality] = useState("")
  const [editorTags, setEditorTags] = useState("")
  const [editorType, setEditorType] = useState<ItemType>("template")
  const [isSaving, setIsSaving] = useState(false)

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: ItemType } | null>(null)

  // Command palette
  const [commandOpen, setCommandOpen] = useState(false)

  // Expanded categories for hierarchical sidebar
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [categoriesRes, bodyPartsRes, templatesRes, snippetsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/body-parts"),
          fetch("/api/templates"),
          fetch("/api/snippets"),
        ])

        const [categoriesData, bodyPartsData, templatesData, snippetsData] = await Promise.all([
          categoriesRes.json(),
          bodyPartsRes.json(),
          templatesRes.json(),
          snippetsRes.json(),
        ])

        // Ensure we always set arrays, even if API returns error objects
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setBodyParts(Array.isArray(bodyPartsData) ? bodyPartsData : [])
        setTemplates(Array.isArray(templatesData) ? templatesData : [])
        setSnippets(Array.isArray(snippetsData) ? snippetsData : [])
        
        // Check for errors
        if (!Array.isArray(templatesData) && templatesData?.error) {
          toast({
            title: "Database Error",
            description: "Please run 'npx prisma db push' to set up the database.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Search with debounce
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true)
        try {
          const params = new URLSearchParams({
            q: searchQuery,
            type: "all",
          })
          if (selectedCategory) params.append("categoryId", selectedCategory)
          if (selectedBodyPart) params.append("bodyPartId", selectedBodyPart)
          if (selectedModality) params.append("modality", selectedModality)

          const res = await fetch(`/api/search?${params}`)
          const data = await res.json()
          setTemplates(Array.isArray(data.templates) ? data.templates : [])
          setSnippets(Array.isArray(data.snippets) ? data.snippets : [])
        } catch (error) {
          console.error("Error searching:", error)
        } finally {
          setIsSearching(false)
        }
      } else {
        // Fetch all if no search query
        try {
          const [templatesRes, snippetsRes] = await Promise.all([
            fetch("/api/templates"),
            fetch("/api/snippets"),
          ])
          const [templatesData, snippetsData] = await Promise.all([
            templatesRes.json(),
            snippetsRes.json(),
          ])
          setTemplates(Array.isArray(templatesData) ? templatesData : [])
          setSnippets(Array.isArray(snippetsData) ? snippetsData : [])
        } catch (error) {
          console.error("Error fetching all data:", error)
        }
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery, selectedCategory, selectedBodyPart, selectedModality])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandOpen(true)
      }
      if (e.key === "Escape") {
        setCommandOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Filter items by category/bodyPart
  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      if (selectedCategory && t.categoryId !== selectedCategory) return false
      if (selectedBodyPart && t.bodyPartId !== selectedBodyPart) return false
      if (selectedModality && t.modality !== selectedModality) return false
      return true
    })
  }, [templates, selectedCategory, selectedBodyPart, selectedModality])

  const filteredSnippets = useMemo(() => {
    return snippets.filter((s) => {
      if (selectedCategory && s.categoryId !== selectedCategory) return false
      if (selectedBodyPart && s.bodyPartId !== selectedBodyPart) return false
      if (selectedModality && s.modality !== selectedModality) return false
      return true
    })
  }, [snippets, selectedCategory, selectedBodyPart, selectedModality])

  // Get body parts that have templates for a specific category
  const getBodyPartsForCategory = useCallback((categoryId: string) => {
    const categoryTemplates = templates.filter(t => t.categoryId === categoryId)
    const bodyPartIds = new Set(categoryTemplates.map(t => t.bodyPartId).filter(Boolean))
    return bodyParts.filter(bp => bodyPartIds.has(bp.id)).map(bp => ({
      ...bp,
      templateCount: categoryTemplates.filter(t => t.bodyPartId === bp.id).length
    }))
  }, [templates, bodyParts])

  // Sort categories in specified order
  const sortedCategories = useMemo(() => {
    const categoryOrder = [
      'X-Ray',
      'Ultrasound',
      'CT',
      'MRI',
      'Fluoroscopy',
      'Mammography',
      'Interventional',
    ]
    
    return [...categories].sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.name)
      const bIndex = categoryOrder.indexOf(b.name)
      
      // If both are in the order list, sort by order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex
      }
      // If only a is in the order list, a comes first
      if (aIndex !== -1) return -1
      // If only b is in the order list, b comes first
      if (bIndex !== -1) return 1
      // If neither is in the order list, sort alphabetically
      return a.name.localeCompare(b.name)
    })
  }, [categories])

  // Toggle category expansion
  const toggleCategoryExpand = useCallback((categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }, [])

  // Handlers
  const handleCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    })
  }, [])

  const handleCopyNormal = useCallback((template: Template) => {
    const normalReport = generateNormalReport(template.content)
    navigator.clipboard.writeText(normalReport)
    toast({
      title: "Normal Report Copied!",
      description: `"${template.title}" - Normal format copied to clipboard`,
    })
  }, [])

  const handleToggleFavorite = useCallback(async (id: string, type: ItemType, currentValue: boolean) => {
    try {
      const res = await fetch(`/api/${type}s/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !currentValue }),
      })

      if (res.ok) {
        const updated = await res.json()
        if (type === "template") {
          setTemplates((prev) => prev.map((t) => (t.id === id ? updated : t)))
        } else {
          setSnippets((prev) => prev.map((s) => (s.id === id ? updated : s)))
        }
        toast({
          title: updated.isFavorite ? "Added to favorites" : "Removed from favorites",
          description: `"${updated.title}" has been ${updated.isFavorite ? "added to" : "removed from"} favorites`,
        })
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      })
    }
  }, [])

  const handleOpenEditor = useCallback((item?: Template | Snippet, type?: ItemType) => {
    if (item) {
      setEditingItem(item)
      setEditorTitle(item.title)
      setEditorDescription(item.description || "")
      setEditorContent(item.content)
      setEditorCategoryId(item.categoryId || "")
      setEditorBodyPartId(item.bodyPartId || "")
      setEditorModality(item.modality || "")
      setEditorTags(item.tags || "")
      setEditorType(type || "template")
    } else {
      setEditingItem(null)
      setEditorTitle("")
      setEditorDescription("")
      setEditorContent("")
      setEditorCategoryId(selectedCategory || "")
      setEditorBodyPartId(selectedBodyPart || "")
      setEditorModality(selectedModality || "")
      setEditorTags("")
      // Use the passed type parameter, fallback to activeTab
      setEditorType(type || activeTab)
    }
    setEditorOpen(true)
  }, [activeTab, selectedCategory, selectedBodyPart, selectedModality])

  const handleSaveEditor = useCallback(async () => {
    if (!editorTitle.trim() || !editorContent.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const data = {
        title: editorTitle,
        description: editorDescription || null,
        content: editorContent,
        categoryId: editorCategoryId || null,
        bodyPartId: editorBodyPartId || null,
        modality: editorModality || null,
        tags: editorTags || null,
      }

      let res
      if (editingItem) {
        res = await fetch(`/api/${editorType}s/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      } else {
        res = await fetch(`/api/${editorType}s`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      }

      if (res.ok) {
        const saved = await res.json()
        if (editingItem) {
          if (editorType === "template") {
            setTemplates((prev) => prev.map((t) => (t.id === saved.id ? saved : t)))
          } else {
            setSnippets((prev) => prev.map((s) => (s.id === saved.id ? saved : s)))
          }
        } else {
          if (editorType === "template") {
            setTemplates((prev) => [saved, ...prev])
          } else {
            setSnippets((prev) => [saved, ...prev])
          }
        }
        setEditorOpen(false)
        toast({
          title: editingItem ? "Updated!" : "Created!",
          description: `${editorType === "template" ? "Template" : "Snippet"} "${saved.title}" has been ${editingItem ? "updated" : "created"}`,
        })
      }
    } catch (error) {
      console.error("Error saving:", error)
      toast({
        title: "Error",
        description: "Failed to save",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }, [editingItem, editorTitle, editorDescription, editorContent, editorCategoryId, editorBodyPartId, editorModality, editorTags, editorType])

  const handleDelete = useCallback(async () => {
    if (!deleteConfirm) return

    try {
      const res = await fetch(`/api/${deleteConfirm.type}s/${deleteConfirm.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        if (deleteConfirm.type === "template") {
          setTemplates((prev) => prev.filter((t) => t.id !== deleteConfirm.id))
        } else {
          setSnippets((prev) => prev.filter((s) => s.id !== deleteConfirm.id))
        }
        setDeleteConfirm(null)
        toast({
          title: "Deleted!",
          description: `${deleteConfirm.type === "template" ? "Template" : "Snippet"} has been deleted`,
        })
      }
    } catch (error) {
      console.error("Error deleting:", error)
      toast({
        title: "Error",
        description: "Failed to delete",
        variant: "destructive",
      })
    }
  }, [deleteConfirm])

  const handleInsertSnippet = useCallback((snippet: Snippet) => {
    setEditorContent((prev) => prev + "\n\n" + snippet.content)
    toast({
      title: "Snippet inserted",
      description: `"${snippet.title}" has been added to the editor`,
    })
  }, [])

  // Logout handler - use GET method for simpler redirect
  const handleLogout = useCallback(() => {
    // Clear any local state immediately
    setTemplates([])
    setSnippets([])
    setCategories([])
    setBodyParts([])
    
    // Show success message
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    })
    
    // Navigate to logout endpoint which will clear cookie and redirect to login
    window.location.href = "/api/auth/logout"
  }, [])

  // Modality options
  const modalities = ["CT", "MRI", "X-Ray", "Ultrasound", "Mammography", "PET", "Nuclear Medicine"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/25">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Radiology Templates</h1>
                <p className="text-xs text-slate-500">Report Template Management System</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search templates, snippets, body parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-20 h-10 bg-white border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                  <CommandIcon className="h-3 w-3" />K
                </kbd>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/25"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => handleOpenEditor(undefined, "template")}
                    className="cursor-pointer"
                  >
                    <LayoutTemplate className="h-4 w-4 mr-2 text-teal-600" />
                    New Template
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleOpenEditor(undefined, "snippet")}
                    className="cursor-pointer"
                  >
                    <FileCode className="h-4 w-4 mr-2 text-purple-600" />
                    New Snippet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                    <User className="h-4 w-4 text-slate-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-slate-900">Admin</p>
                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-72 shrink-0">
            <Card className="sticky top-24 bg-white/80 backdrop-blur-sm border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-700">Categories</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {templates.length} Templates
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-1">
                    {/* All Templates */}
                    <Button
                      variant={selectedCategory === null && selectedBodyPart === null ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start font-medium"
                      onClick={() => {
                        setSelectedCategory(null)
                        setSelectedBodyPart(null)
                      }}
                    >
                      <Layers className="h-4 w-4 mr-2" />
                      All Templates
                      <Badge variant="outline" className="ml-auto">
                        {templates.length}
                      </Badge>
                    </Button>

                    <Separator className="my-2" />

                    {/* Hierarchical Categories */}
                    {sortedCategories.map((category) => {
                      const isExpanded = expandedCategories.has(category.id)
                      const categoryBodyParts = getBodyPartsForCategory(category.id)
                      const isSelected = selectedCategory === category.id && selectedBodyPart === null
                      const totalCount = category._count?.templates || 0

                      return (
                        <div key={category.id}>
                          {/* Category Header */}
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => toggleCategoryExpand(category.id)}
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-3 w-3 text-slate-400" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-slate-400" />
                              )}
                            </Button>
                            <Button
                              variant={isSelected ? "secondary" : "ghost"}
                              size="sm"
                              className="flex-1 justify-start"
                              onClick={() => {
                                setSelectedCategory(category.id)
                                setSelectedBodyPart(null)
                              }}
                            >
                              {categoryIcons[category.name] || <Layers className="h-4 w-4" />}
                              <span className="ml-2">{category.name}</span>
                              <Badge variant="outline" className="ml-auto text-xs">
                                {totalCount}
                              </Badge>
                            </Button>
                          </div>

                          {/* Body Parts (Subcategories) */}
                          {isExpanded && categoryBodyParts.length > 0 && (
                            <div className="ml-6 border-l border-slate-200 pl-2 mt-1 space-y-1">
                              {categoryBodyParts.map((bp) => (
                                <Button
                                  key={bp.id}
                                  variant={selectedCategory === category.id && selectedBodyPart === bp.id ? "secondary" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start text-xs h-7"
                                  onClick={() => {
                                    setSelectedCategory(category.id)
                                    setSelectedBodyPart(bp.id)
                                  }}
                                >
                                  {bp.name}
                                  <Badge variant="outline" className="ml-auto text-[10px]">
                                    {bp.templateCount}
                                  </Badge>
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>

                <Separator className="my-3" />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 p-3 text-center">
                    <div className="text-xl font-bold text-teal-700">{templates.length}</div>
                    <div className="text-xs text-teal-600">Templates</div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-3 text-center">
                    <div className="text-xl font-bold text-purple-700">{snippets.length}</div>
                    <div className="text-xs text-purple-600">Snippets</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ItemType)} className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList className="bg-white/80 backdrop-blur-sm border border-slate-200">
                  <TabsTrigger value="template" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    <LayoutTemplate className="h-4 w-4 mr-2" />
                    Templates ({filteredTemplates.length})
                  </TabsTrigger>
                  <TabsTrigger value="snippet" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                    <FileCode className="h-4 w-4 mr-2" />
                    Snippets ({filteredSnippets.length})
                  </TabsTrigger>
                </TabsList>

                {isSearching && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </div>
                )}
              </div>

              {/* Templates Tab */}
              <TabsContent value="template" className="m-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                  </div>
                ) : filteredTemplates.length === 0 ? (
                  <Card className="border-dashed bg-white/50">
                    <CardContent className="flex flex-col items-center justify-center py-20">
                      <FileText className="h-12 w-12 text-slate-300 mb-4" />
                      <p className="text-slate-500 mb-4">No templates found</p>
                      <Button onClick={() => handleOpenEditor()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Template
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className="group bg-white/80 backdrop-blur-sm border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200 cursor-pointer"
                        onClick={() => handleOpenEditor(template, "template")}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                {template.category && (
                                  <Badge
                                    variant="outline"
                                    className={cn("text-xs", categoryColors[template.category.name] || "")}
                                  >
                                    {categoryIcons[template.category.name]}
                                    <span className="ml-1">{template.category.name}</span>
                                  </Badge>
                                )}
                                {template.bodyPart && (
                                  <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                                    {template.bodyPart.name}
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-base font-medium text-slate-900 group-hover:text-teal-600 transition-colors">
                                {template.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleToggleFavorite(template.id, "template", template.isFavorite)
                                }}
                              >
                                {template.isFavorite ? (
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ) : (
                                  <StarOff className="h-4 w-4 text-slate-400" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCopy(template.content)
                                }}
                                title="Copy template"
                              >
                                <Copy className="h-4 w-4 text-slate-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-green-50"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCopyNormal(template)
                                }}
                                title="Copy normal report"
                              >
                                <CheckCheck className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-400 hover:text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setDeleteConfirm({ id: template.id, type: "template" })
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-2 text-slate-500">
                            {template.description || template.content.slice(0, 150) + "..."}
                          </CardDescription>
                          {template.tags && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {template.tags.split(",").slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Sparkles className="h-3 w-3" />
                              Used {template.usageCount} times
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-500 transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Snippets Tab */}
              <TabsContent value="snippet" className="m-0">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
                  </div>
                ) : filteredSnippets.length === 0 ? (
                  <Card className="border-dashed bg-white/50">
                    <CardContent className="flex flex-col items-center justify-center py-20">
                      <FileCode className="h-12 w-12 text-slate-300 mb-4" />
                      <p className="text-slate-500 mb-4">No snippets found</p>
                      <Button onClick={() => handleOpenEditor()}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Snippet
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {filteredSnippets.map((snippet) => (
                      <Card
                        key={snippet.id}
                        className="group bg-white/80 backdrop-blur-sm border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-200 cursor-pointer"
                        onClick={() => handleOpenEditor(snippet, "snippet")}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm font-medium text-slate-900 group-hover:text-teal-600 transition-colors">
                              {snippet.title}
                            </CardTitle>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCopy(snippet.content)
                                }}
                              >
                                <Copy className="h-3 w-3 text-slate-400" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-slate-500 line-clamp-3">
                            {snippet.content}
                          </p>
                          {snippet.category && (
                            <Badge
                              variant="outline"
                              className={cn("text-xs mt-2", categoryColors[snippet.category.name] || "")}
                            >
                              {snippet.category.name}
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Editor Dialog */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit" : "Create"} {editorType === "template" ? "Template" : "Snippet"}
            </DialogTitle>
            <DialogDescription>
              {editorType === "template"
                ? "Create a comprehensive radiology report template with placeholders"
                : "Create a reusable snippet for quick insertion into templates"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  placeholder="e.g., CT Head Without Contrast"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Modality</Label>
                <Select value={editorCategoryId} onValueChange={setEditorCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select modality" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyPart">Body Part</Label>
                <Select value={editorBodyPartId} onValueChange={setEditorBodyPartId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body part" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyParts.map((bp) => (
                      <SelectItem key={bp.id} value={bp.id}>
                        {bp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modality">Exam Type</Label>
                <Input
                  id="modality"
                  value={editorModality}
                  onChange={(e) => setEditorModality(e.target.value)}
                  placeholder="e.g., CT, MRI"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editorDescription}
                onChange={(e) => setEditorDescription(e.target.value)}
                placeholder="Brief description of the template"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={editorTags}
                onChange={(e) => setEditorTags(e.target.value)}
                placeholder="brain, trauma, stroke"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Content</Label>
                {editorType === "template" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileCode className="h-4 w-4 mr-2" />
                        Insert Snippet
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                      <Command>
                        <CommandInput placeholder="Search snippets..." />
                        <CommandList>
                          <CommandEmpty>No snippets found.</CommandEmpty>
                          <CommandGroup heading="Snippets">
                            {snippets.slice(0, 10).map((snippet) => (
                              <CommandItem
                                key={snippet.id}
                                onSelect={() => handleInsertSnippet(snippet)}
                              >
                                <FileCode className="h-4 w-4 mr-2" />
                                <span className="truncate">{snippet.title}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <Textarea
                id="content"
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Enter template content with [placeholders] for variable fields..."
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="flex gap-2 mr-auto">
              {editorType === "template" && editorContent && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const normalReport = generateNormalReport(editorContent)
                    navigator.clipboard.writeText(normalReport)
                    toast({
                      title: "Normal Report Copied!",
                      description: "Normal format copied to clipboard",
                    })
                  }}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Copy Normal
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => handleCopy(editorContent)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditorOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEditor} disabled={isSaving} className="bg-teal-500 hover:bg-teal-600">
                {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingItem ? "Save Changes" : "Create"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteConfirm?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Command Palette */}
      <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
        <DialogContent className="p-0 max-w-xl">
          <Command className="rounded-lg border-0 shadow-none">
            <CommandInput placeholder="Search templates and snippets..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Templates">
                {templates.slice(0, 5).map((template) => (
                  <CommandItem
                    key={template.id}
                    onSelect={() => {
                      handleOpenEditor(template, "template")
                      setCommandOpen(false)
                    }}
                  >
                    <LayoutTemplate className="h-4 w-4 mr-2" />
                    <span>{template.title}</span>
                    {template.category && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        {template.category.name}
                      </Badge>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Snippets">
                {snippets.slice(0, 5).map((snippet) => (
                  <CommandItem
                    key={snippet.id}
                    onSelect={() => {
                      handleOpenEditor(snippet, "snippet")
                      setCommandOpen(false)
                    }}
                  >
                    <FileCode className="h-4 w-4 mr-2" />
                    <span>{snippet.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}
