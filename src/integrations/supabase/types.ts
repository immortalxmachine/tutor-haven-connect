export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      gamification: {
        Row: {
          badges: Json | null
          created_at: string
          id: string
          last_activity: string | null
          level: number | null
          longest_streak: number | null
          points: number | null
          streaks: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          badges?: Json | null
          created_at?: string
          id?: string
          last_activity?: string | null
          level?: number | null
          longest_streak?: number | null
          points?: number | null
          streaks?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          badges?: Json | null
          created_at?: string
          id?: string
          last_activity?: string | null
          level?: number | null
          longest_streak?: number | null
          points?: number | null
          streaks?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      mock_tests: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          id: string
          question_count: number
          subject: string
          time_limit_minutes: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          id?: string
          question_count: number
          subject: string
          time_limit_minutes: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          question_count?: number
          subject?: string
          time_limit_minutes?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      study_materials: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          id: string
          subject: string
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          id?: string
          subject: string
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          id?: string
          subject?: string
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      study_roadmaps: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          estimated_duration: string
          id: string
          steps: Json
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          estimated_duration: string
          id?: string
          steps: Json
          subject: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          estimated_duration?: string
          id?: string
          steps?: Json
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      test_questions: {
        Row: {
          correct_answer: number
          created_at: string
          explanation: string
          id: string
          options: Json
          question: string
          subject: string
          test_id: string | null
          topic: string
          updated_at: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          explanation: string
          id?: string
          options: Json
          question: string
          subject: string
          test_id?: string | null
          topic: string
          updated_at?: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          explanation?: string
          id?: string
          options?: Json
          question?: string
          subject?: string
          test_id?: string | null
          topic?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      test_results: {
        Row: {
          correct_answers: number[]
          date: string
          id: string
          incorrect_answers: number[]
          score: number
          strengths: string[] | null
          test_id: string | null
          time_taken_seconds: number
          total_questions: number
          user_id: string | null
          weaknesses: string[] | null
        }
        Insert: {
          correct_answers: number[]
          date?: string
          id?: string
          incorrect_answers: number[]
          score: number
          strengths?: string[] | null
          test_id?: string | null
          time_taken_seconds: number
          total_questions: number
          user_id?: string | null
          weaknesses?: string[] | null
        }
        Update: {
          correct_answers?: number[]
          date?: string
          id?: string
          incorrect_answers?: number[]
          score?: number
          strengths?: string[] | null
          test_id?: string | null
          time_taken_seconds?: number
          total_questions?: number
          user_id?: string | null
          weaknesses?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "test_results_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_sessions: {
        Row: {
          created_at: string
          duration: string
          feedback: string | null
          id: string
          mode: string
          rating: number | null
          start_time: string
          status: string
          subject: string
          topic: string
          tutor_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration: string
          feedback?: string | null
          id?: string
          mode: string
          rating?: number | null
          start_time: string
          status: string
          subject: string
          topic: string
          tutor_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: string
          feedback?: string | null
          id?: string
          mode?: string
          rating?: number | null
          start_time?: string
          status?: string
          subject?: string
          topic?: string
          tutor_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          available_in: string | null
          avatar: string
          badges: string[] | null
          communication_modes: string[]
          created_at: string
          expertise: string[]
          id: string
          level: number | null
          name: string
          next_session: string | null
          rating: number | null
          reviews: number | null
          specialty: string
          status: string
          updated_at: string
        }
        Insert: {
          available_in?: string | null
          avatar: string
          badges?: string[] | null
          communication_modes: string[]
          created_at?: string
          expertise: string[]
          id?: string
          level?: number | null
          name: string
          next_session?: string | null
          rating?: number | null
          reviews?: number | null
          specialty: string
          status: string
          updated_at?: string
        }
        Update: {
          available_in?: string | null
          avatar?: string
          badges?: string[] | null
          communication_modes?: string[]
          created_at?: string
          expertise?: string[]
          id?: string
          level?: number | null
          name?: string
          next_session?: string | null
          rating?: number | null
          reviews?: number | null
          specialty?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roadmap_progress: {
        Row: {
          completed_steps: number[] | null
          current_step: number | null
          id: string
          last_updated_at: string
          roadmap_id: string | null
          started_at: string
          user_id: string | null
        }
        Insert: {
          completed_steps?: number[] | null
          current_step?: number | null
          id?: string
          last_updated_at?: string
          roadmap_id?: string | null
          started_at?: string
          user_id?: string | null
        }
        Update: {
          completed_steps?: number[] | null
          current_step?: number | null
          id?: string
          last_updated_at?: string
          roadmap_id?: string | null
          started_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roadmap_progress_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "study_roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string
          font_size: string | null
          high_contrast: boolean | null
          id: string
          notification_preferences: Json | null
          text_to_speech: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          font_size?: string | null
          high_contrast?: boolean | null
          id: string
          notification_preferences?: Json | null
          text_to_speech?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          font_size?: string | null
          high_contrast?: boolean | null
          id?: string
          notification_preferences?: Json | null
          text_to_speech?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
