<?php

namespace App\Enums;

enum UserRole: string
{
    case Client = 'client';
    case Student = 'student';
    case Admin = 'admin';

    /**
     * Get the display label for the role.
     */
    public function label(): string
    {
        return match ($this) {
            self::Client => 'Client',
            self::Student => 'Student',
            self::Admin => 'Administrator',
        };
    }

    /**
     * Get the roles a user may choose for themselves at registration.
     *
     * @return array<array{value: string, label: string}>
     */
    public static function selfAssignable(): array
    {
        return collect([self::Client, self::Student])
            ->map(fn (self $role) => ['value' => $role->value, 'label' => $role->label()])
            ->values()
            ->toArray();
    }
}
